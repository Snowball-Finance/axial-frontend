# Container
a container, is a building block, with slice of its own.
containers should be generated with `yarn generate container` command.
each page of application should have a separate container.
each independent part of application that has it's own state and updates it's own state, specially if it's used in several places, should be in a separate container.

containers can see each others state, and update them, but first we should make sure that "Saga" and "Reducer" of the target container is injected, this will be done by using use"Container"Slice() hook somewhere in the app.

### saga
saga of a container has access to every `injected` reducer, and every slice of application state
saga should not know that it's being used in a react application (other than throwing a toast with toastify package).

### state
the only places we use local state is for little ui changes like showing a tooltip, other than that, there should be no local state used in the application without discussing about it with one of the Platform development team members, every state in the application will be stored on redux, and every change of state should be done in redux ecosystem. if we want to have a computed state, we will avoid using useEffect and use useSelector with proper state domains combination in the selector, placed in the related `selectors.ts` file inside the container.


### selectors and useSelector
selectors should be as specific as possible, is some slice of app has 10 segment of state, it should have 10 selectors and 10 domains for selectors
all the useSelectors should be used exactly in the parts that they are wanted, isolate the component that is using a part of state, and use the useSelector inside that component, we don't want anything to be unpredictable.

### types
all the types related to container state, should be defined in `types.ts` file in the container.

### tokenization
all the static strings that are used in the view our app, should be implemented with i18n, and be tokenized, like the examples in Example container
all the static strings that are used in variables or are passed to a method, should be used via type, or enum or at lease in a json var
for example, we will never use such syntax: localStorage["key"] ="value"
the correct way is this: localStorage[LocalStorageKeys.key]="value"
and the LocalStorageKeys can be enum or a json variable
# coding style

### refactor flags
every file containing jsx elements should be less than 150 lines, if it is not, it should be broken down and refactored to multiple components.

core of any component that is using redux, should be refactored to a separate file, core is anything that can dispatch an action, or is waiting for a data from selector, anything other than styling Wrappers.

