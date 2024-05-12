import { NormalizeDateSort } from '../utils';

export const update = {
    id: 1125,
    version: '3.0.2',
    date: Date.now(),
    test_flight: "https://github.com/Wrkor",
    description: 'Fusce nisl odio, venenatis et sodales eu, luctus in nibh. \nNulla facilisi. \nNunc sit amet tortor eu nisi malesuada volutpat. \nNulla diam justo, facilisis vitae placerat ut, consequat vitae nunc.',
}

export const review = {
    id: 1125,
    date: Date.now(),
    mark: 3.7,
    name: "Александр",
    lastname: "Потапов",
    description: 'Fusce nisl odio, venenatis et sodales eu, luctus in nibh. \nNulla facilisi. \nNunc sit amet tortor eu nisi malesuada volutpat. \nNulla diam justo, facilisis vitae placerat ut, consequat vitae nunc.',
}

export const updates = [];
updates.push({...update, id: 12313, date: new Date(2019, 1, 13).getTime()});
updates.push({...update, id: 123, date: new Date(2024, 1, 4).getTime()});
updates.push({...update, id: 1224, date: new Date(2020, 11, 15).getTime()});
updates.push({...update, id: 1523, date: new Date(2021, 1, 6).getTime()});
updates.push({...update, id: 1253, date: new Date(2024, 2, 27).getTime()});

export const reviews = [];
reviews.push({...review, id: 124313, date: new Date(2009, 2, 23).getTime()});
reviews.push({...review, id: 1223, date: new Date(2020, 4, 22).getTime()});
reviews.push({...review, id: 12124, date: new Date(2021, 5, 25).getTime()});
reviews.push({...review, id: 15243, date: new Date(2022, 4, 1).getTime()});
reviews.push({...review, id: 12653, date: new Date(2023, 2, 22).getTime()});

const normalizedUpdates = NormalizeDateSort(updates)

export const app = {
    id: 1567, 
    name: 'En+ Binding',
    status: 'Рабочая версия',
    developer: 'En+ Digital',
    description: "Aenean enim est, hendrerit vel sodales id, porttitor tincidunt urna. Integer metus ipsum, egestas at velit ac, tempor efficitur massa. Praesent finibus convallis placerat. Quisque convallis consequat diam ut faucibus. Phasellus tincidunt, massa dictum cursus accumsan, ex tellus viverra orci, non faucibus mauris neque id turpis. Curabitur rutrum est sed velit molestie, id malesuada lorem facilisis. Curabitur sed nunc ac nisl eleifend sagittis. Cras lobortis massa sed justo finibus porttitor. Fusce blandit velit in malesuada hendrerit. Quisque leo libero, consectetur ac imperdiet id, rutrum porta enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    min_android: '5.0',
    min_ios: '14.0',
    icon: "data/Rectangle_1.png",
    images: "data/Rectangle_2.png\ndata/Rectangle_3.png\ndata/Rectangle_4.png\ndata/Rectangle_5.png",
    app_access: {
        id: 0,
    },
    downloads: 3000,
    mark: 3.5,
    size: '80.00 МБ',
    updates: updates,
    reviews: reviews,
    lastUpdate: normalizedUpdates[0],
    release: normalizedUpdates[normalizedUpdates.length - 1],
};

export const apps = [];
apps.push({...app, id: 1});
apps.push({...app, id: 2});
apps.push({...app, id: 3});
apps.push({...app, id: 4});

export const appId = {
    name: app.name, 
    id: app.id, 
}

export const appsId = [];
appsId.push({...appId, id: 1});
appsId.push({...appId, name: "En+ bibib", id: 2});
appsId.push({...appId, name: "En+ b213", id: 3});
appsId.push({...appId, name: "En+ sdffsd", id: 4});
appsId.push({...appId, name: "En+ 2112", id: 5});
appsId.push({...appId, name: "Ffff", id: 6});