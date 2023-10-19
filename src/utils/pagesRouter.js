const navegateRouter = (page) => {
    switch (page) {
        case 'incorporacao-imobiliaria':
            return 'pt/real-state';
        case 'leadership-institutel':
            return 'pt/leadership-institutel';
        case 'outras':
            return 'pt/leadership-institutel';
        default:
            return 'pt/real-state';
    }
}

const navegateRouterEn = (page) => {
    switch (page) {
        case 'incorporacao-imobiliaria':
            return 'en/real-state';
        case 'leadership-institutel':
            return 'en/leadership-institutel';
        case 'outras':
            return 'en/leadership-institutel';
        default:
            return 'en/real-state';
    }
}

module.exports = {
    navegateRouter,
    navegateRouterEn
}