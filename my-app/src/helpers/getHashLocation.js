export default (location) => {
    return location ? location.hash.split('#/')[1] : null;
}