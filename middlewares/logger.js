const logger = (store) => (next) => (action) => {
    console.group(action.type);
    console.log('The action:');
    console.log(action);
    const returnValue = next(action);
    console.log('The new state:');
    console.log(store.getState());
    console.groupEnd();
    return returnValue;
};

export default logger;
