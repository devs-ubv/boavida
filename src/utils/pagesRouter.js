const navegateRouter = (page) => {
    switch (page) {
        case 'real-state':
            return 'real-state';
        case 'leadership-institutel':
            return 'leadership-institutel';
        default:
            return 'real-state';
    }
}

module.exports = {
    navegateRouter
}