const constantsState = {
    routes: {
        any: '*',
        main: '/',
        login: '/login',
        error404: '/404',
        apps: '/apps',
        app: '/apps/:id',
        create: '/apps/create',
        update: '/apps/update',
        edit: '/apps/edit/:id',
    },
    endPoints: {
        auth: '/api/users',
        phone: '/api/users/code',
        login: '/api/users/auth',
        logout: '/api/users/logout',
        apps: '/api/apps',
        appsId: '/api/apps',
        app: '/api/apps',
        create: '/api/apps',
        update: '/api/apps/update',
        edit: '/api/apps',
        delete: '/api/apps',
        pushChecked: '/api/push',
    },
    api: 'http://77.222.60.86:8000',
    sizeWindow: {
        phone: 360,
        tablet: 960,
        pc: 1600,
    },
    platform: {
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
        }
    },
    localStorageKey: {
        theme: 'theme',
    },
    localStorageValue: {
        theme: {
            White: 'white',
            Dark: 'dark',
        },
    },
    select: {
        status: [
            {
                value: "Рабочая версия", 
                label: "Рабочая версия", 
            },
            {
                value: "Тестирование", 
                label: "Тестирование", 
            }, 
        ],
        access: [
            {
                value: "Общий", 
                label: "Общий", 
            },
            {
                value: "Закрытый",
                label: "Закрытый",
            },
            {
                value: "Частичный",
                label: "Частичный",
            },
        ],
    },
    ext: {
        images: [
            "image/jpeg", 
            "image/jpg", 
            "image/png",
            "image/svg+xml",
            "image/bmp",
        ],
        android: [
            "application/vnd.android.package-archive"
        ],
    },
   
}

export default constantsState;