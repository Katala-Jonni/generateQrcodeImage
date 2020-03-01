module.exports = {
    ifeq(a, b, options) {
        const val1 = a ? a.toString() : a;
        const val2 = b ? b.toString() : b;
        if (val1 === val2) {
            return options.fn(this);
        }
        return options.inverse(this);
    },
};
