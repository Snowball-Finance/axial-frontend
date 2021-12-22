import { Multicall } from 'ethereum-multicall';
import { ethers } from 'ethers';
import { BNToFloat, floatToBN } from "common/format";
import { isEmpty } from "common/utility";

class ContractCall {
    contractAddress = "";
    reference = "";
    abi = [];
    calls = [];

    constructor(address, abi, calls) {
        this.reference = address;
        this.contractAddress = address;
        this.abi = abi;
        if (calls) {
            this.calls = [...calls];
        }
    }

    setCall(methodName, methodParams) {
        const call = {
            reference: `${methodName}Call`,
            methodName: methodName,
            methodParameters: [...methodParams]
        };
        this.calls.push(call);
    }

}

//contract array should be provided with 
// [ {reference: string, contractCalls: [ {reference: string, methodName: string, methodParameters: any}, ... ], abi: []}, ... ]
const getMultiContractData = async (provider, contractArray) => {
    try {
        const multicall = new Multicall({ ethersProvider: provider });
        const call = await multicall.call(contractArray);

        const resultSet = new Object();

        const contractNames = Object.keys(call.results);
        contractNames.forEach(name => {
            const result = new Object();
            call.results[name].callsReturnContext.forEach(values => {
                //I don`t want an array when the result is not an array
                if (values.returnValues.length > 1) {
                    result[values.methodName] = convertMBNtoEthersBN(values.returnValues);
                } else {
                    result[values.methodName] = convertMBNtoEthersBN(values.returnValues)[0];
                }
            });
            resultSet[name] = result;
        });

        //result is [contractName: [ result1,... ],...]
        //result1 = { call: [return] }
        return resultSet;
    } catch (error) {
        throw new Error(`Multicall failed => ${error.message}`)
    }
}


export const generatePoolInfo = ({ item, gauges, contractData, prices }) => {
    const lpData = contractData[item.lpAddress];
    const snowglobeData = contractData[item.address];
    const gauge = gauges.find(gauge => gauge.address.toLowerCase() === item.gaugeInfo.address.toLowerCase());

    let totalSupply = 0,
        userDepositedLP = 0,
        SNOBHarvestable = 0,
        SNOBValue = 0,
        underlyingTokens,
        userBalanceSnowglobe,
        userLPBalance,
        lpDecimals = 18;

    if (!isEmpty(gauge)) {
        SNOBHarvestable = gauge.harvestable / 1e18;
        SNOBValue = SNOBHarvestable * prices?.SNOB;
    }

    userLPBalance = lpData.balanceOf;
    lpDecimals = lpData.decimals;
    let snowglobeRatio = floatToBN(1, 18);
    switch (item.kind) {
        case 'Snowglobe':
            userBalanceSnowglobe = snowglobeData.balanceOf;
            if (+userBalanceSnowglobe <= 0 && gauge.staked <= 0) {
                break;
            }

            totalSupply = snowglobeData.totalSupply;

            const snowglobeTotalBalance = snowglobeData.balance;
            if (snowglobeTotalBalance > 0) {
                snowglobeRatio = snowglobeData.getRatio;
            } else {
                snowglobeRatio = floatToBN(1, 18);
            }
            if (userBalanceSnowglobe.gt('0x0') && userLPBalance.eq('0x0')) {
                userLPBalance = userLPBalance.add(userBalanceSnowglobe);
            }
            userDepositedLP = BNToFloat(userBalanceSnowglobe, lpDecimals) * BNToFloat(snowglobeRatio, 18);

            if (!isEmpty(gauge)) {
                userDepositedLP += (gauge.staked / 10 ** lpDecimals) * BNToFloat(snowglobeRatio, 18);
            }

            if (userDepositedLP > 0 && item.token1.address) {
                let reserves = lpData.getReserves;
                let totalSupplyPGL = BNToFloat(lpData.totalSupply, 18);

                const r0 = BNToFloat(reserves[0], item.token0.decimals);
                const r1 = BNToFloat(reserves[1], item.token1.decimals);
                let reserve0Owned = (userDepositedLP * r0) / totalSupplyPGL;
                let reserve1Owned = (userDepositedLP * r1) / totalSupplyPGL;
                underlyingTokens = {
                    token0: {
                        address: item.token0.address,
                        symbol: item.token0.symbol,
                        reserveOwned: reserve0Owned,
                    },
                    token1: {
                        address: item.token1.address,
                        symbol: item.token1.symbol,
                        reserveOwned: reserve1Owned,
                    },
                };
            }
            break;
        case 'Stablevault':
            if (!isEmpty(gauge)) {
                userDepositedLP = gauge.staked / 1e18;
                totalSupply = gauge.totalSupply;
            }
            break;
        default:
            break
    }

    return {
        ...item,
        address: item.address,
        userLPBalance,
        lpDecimals,
        userDepositedLP: userDepositedLP,
        usdValue: userDepositedLP * item.pricePoolToken,
        totalSupply,
        SNOBHarvestable,
        SNOBValue,
        gauge,
        underlyingTokens,
        userBalanceSnowglobe,
        userBalanceGauge: gauge ? gauge.staked : 0,
        snowglobeRatio,
    };
};

//convert Multicall BN to Ethers BN
const convertMBNtoEthersBN = (retArray) => {
    return retArray.map(ret => {
        if (ret.type === "BigNumber") {
            return ethers.BigNumber.from(ret);
        }
        return ret;
    });
}

export {
    ContractCall,
    getMultiContractData,
}