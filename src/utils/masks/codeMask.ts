const codeMask = (value: string) => {
    return value.replace(/\D/g, "")
        .slice(0, 6);
};
export default codeMask;