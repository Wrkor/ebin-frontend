const storageState = {
    sizeWindow: {
        phone: 360,
        tablet: 960,
        pc: 1600,
    },
    platforms: {
        isWindowTablet: false,
        isWindowPhone: false,
        isWindowPC: false,
    },
    isBlackTheme: false,
    colors: {
        whiteTheme: {
            black: "rgba(33, 37, 41, 1)",
            black90: "rgba(33, 37, 41, 0.9)",
            black80: "rgba(33, 37, 41, 0.8)",
            black70: "rgba(33, 37, 41, 0.7)",
            black60: "rgba(33, 37, 41, 0.6)",
            bgPage: "rgba(255, 255, 255, 1)",
            bgModals: "rgba(255, 255, 255, 1)",
            bgInput: "rgba(255, 255, 255, 1)",
            borderBlock: "rgba(33, 37, 41, 0.08)",
            borderTable: "rgba(33, 37, 41, 0.2)",
            filter: "drop-shadow(0px 2px 4px rgba(33, 37, 41, 0.5))",
            errorColor: "rgba(255, 31, 31, 0.8)"
        },
        blackTheme: {
            black: "rgba(223, 223, 223, 1)",
            black90: "rgba(223, 223, 223, 0.9)",
            black80: "rgba(223, 223, 223, 0.8)",
            black70: "rgba(223, 223, 223, 0.7)",
            black60: "rgba(223, 223, 223, 0.6)",
            bgPage: "rgba(19, 19, 19, 1)",
            bgModals: "rgba(40, 40, 40, 1)",
            bgInput: "rgba(40, 40, 40, 1)",
            borderBlock: "rgba(223, 223, 223, 0.08)",
            borderTable: "rgba(223, 223, 223, 0.2)",
            filter: "none",
            errorColor: "rgba(255, 31, 31, 0.8)"
        }
    },
}

export default storageState;