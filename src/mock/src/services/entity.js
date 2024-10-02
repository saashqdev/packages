import { mockRequest } from '../utils';

const mockData = [
    { id: 1, name: 'easy-code', description: 'Low-Code Platform' },
    { id: 2, name: 'kubevue', description: 'Kubevue Framework' },
    { id: 2, name: 'cloud-ui', description: 'Cloud UI component library' },
];

export default {
    loadList() {
        return mockRequest(mockData);
    },
    loadAll() {
        return mockRequest(mockData);
    },
    loadDetail(id) {
        return mockRequest(mockData.find((item) => item.id === +id));
    },
    create(params) {
        // A request to filter data on the backend is simulated here.
        return mockRequest({
            code: 200,
            success: true,
        });
    },
    update(params) {
        return mockRequest({
            code: 200,
            success: true,
        });
    },
};
