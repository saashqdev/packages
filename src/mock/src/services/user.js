import { mockRequest } from '../utils';

// Simulate the construction of 75 pieces of back-end data
const mockData = (() => {
    const baseData = [
        { name: 'Homer Simpson', phone: '18612917895', email: 'hsimpson@gmail.com', address: 'Kubeworkz, 1931 Norris Avenue, Fort Erie, Ontario', createdTime: 1464421931000 , loginTime: 1527515531000 },
        { name: 'Marge Simpson', phone: '13727160283', email: 'msimpson@gmail.com', address: 'Skunkhollow Technology Park, 1901 Norris Avenue, Fort Erie, Ontario', createdTime: 1520864676000 , loginTime: 1552400676000 },
        { name: 'John Doe', phone: '18897127809', email: 'jdoe@gmail.com', address: 'Camden Science and Technology Park, 29 Barclay Street, Hamilton, Ontario', createdTime: 1494488730000, loginTime: 1558165530000 },
        { name: 'Dave Cork', phone: '18749261214', email: 'dcork@gmail.com', address: 'Springfield Technology Park, 29 Camden Street, Toronto, Ontario', createdTime: 1476073921000, loginTime: 1544428081000 },
        { name: 'Bart Simpson', phone: '13579340020', email: 'bsimpson@gmail.com', address: 'Kubeworkz Phase II, Kubeworkz Building, 666 Mockingbird Lane, Fort Erie, Ontario', createdTime: 1468614726000, loginTime: 1531675926000 },
    ];

    const result = [];
    for (let i = 0; i < 75; i++) {
        const item = Object.assign({}, baseData[i % 5]);
        item.name += '-' + (Math.random() * 20 >> 0);
        item.phone = String(+item.phone + (Math.random() * 10 >> 0) * Math.pow(10, Math.random() * 8 >> 0));
        item.createdTime += i * 1000 * 3600 * 24;
        item.loginTime += i * 1000 * 3600 * 24;
        result.push(item);
    }

    return result;
})();

export default {
    loadShort() {
        return mockRequest([
            { name: 'Homer Simpson', phone: '18612917895', email: 'hsimpson@gmail.com', address: 'Kubeworkz, 1931 Norris Avenue, Fort Erie, Ontario', createdTime: 1464421931000 , loginTime: 1527515531000 },
            { name: 'Marge Simpson', phone: '13727160283', email: 'msimpson@gmail.com', address: 'Skunkhollow Technology Park, 1901 Norris Avenue, Fort Erie, Ontario', createdTime: 1520864676000 , loginTime: 1552400676000 },
            { name: 'John Doe', phone: '18897127809', email: 'jdoe@gmail.com', address: 'Camden Science and Technology Park, 29 Barclay Street, Hamilton, Ontario', createdTime: 1494488730000, loginTime: 1558165530000 },
            { name: 'Dave Cork', phone: '18749261214', email: 'dcork@gmail.com', address: 'Springfield Technology Park, 29 Camden Street, Toronto, Ontario', createdTime: 1476073921000, loginTime: 1544428081000 },
            { name: 'Bart Simpson', phone: '13579340020', email: 'bsimpson@gmail.com', address: 'Kubeworkz Phase II, Kubeworkz Building, 666 Mockingbird Lane, Fort Erie, Ontario', createdTime: 1468614726000, loginTime: 1531675926000 },
        ]);
    },
    loadAll() {
        return mockRequest(mockData);
    },
    loadPageable(offset, limit) {
        // A backend paging request is simulated here.
        return mockRequest({
            total: mockData.length,
            data: mockData.slice(offset, offset + limit),
        });
    },
    loadPageableWithoutTotal(offset, limit) {
        // A backend paging request is simulated here.
        return mockRequest(mockData.slice(offset, offset + limit));
    },
    loadPageableSortable(paging, sorting) {
        // A backend sorting and paging request is simulated here.
        const orderSign = sorting.order === 'asc' ? 1 : -1;
        return mockRequest({
            total: mockData.length,
            data: mockData.sort((item1, item2) => {
                if (item1[sorting.field] === item2[sorting.field])
                    return 0;
                else
                    return item1[sorting.field] > item2[sorting.field] ? orderSign : -orderSign;
            }).slice(paging.offset, paging.offset + paging.limit),
        });
    },
};
