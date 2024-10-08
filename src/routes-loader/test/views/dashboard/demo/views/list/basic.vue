<template>
    <u-linear-layout direction="vertical" gap="small">
        <u-page-summary>
            Common List Pages
        </u-page-summary>
        <u-linear-layout justify="space-between">
            <u-linear-layout>
                <u-button icon="create" color="primary" @click="createItem">Create Instance (method)</u-button>
                <u-button icon="create" color="primary" to="/demo/form/basic">Create Instance (routing)</u-button>
                <u-button square icon="refresh" @click="refresh"></u-button>
            </u-linear-layout>
            <u-linear-layout type="flex" justify="end">
                <u-button color="primary" to="/demo/list/localList">Local Paging</u-button>
            </u-linear-layout>
        </u-linear-layout>
        <u-linear-layout type="flex" justify="end">
            <u-search v-model="form.search" placeholder="Search"></u-search>
        </u-linear-layout>

        <u-table-view :class="$style.tableView" :data="list" :loading="loading" value-field="name" :values="selected">
            <u-table-view-column type="checkbox" width="8%"></u-table-view-column>
            <u-table-view-column title="Message Title">
                <template slot="cell" slot-scope="{ item }">
                    {{ item.name }}
                </template>
            </u-table-view-column>
            <u-table-view-column title="Time">
                <template slot="cell" slot-scope="{ item }">
                    {{ item.time | dateFormat }}
                </template>
            </u-table-view-column>
            <u-table-view-column title="Operation">
                <template slot="cell" slot-scope="scope">
                    <u-linear-layout>
                        <u-link :to="{name: 'demo.detail', query: {id: scope.item.ch_name}}">
                            View Categories
                        </u-link>
                        <u-link @click="editDesc(scope.item)">
                            Modify description
                        </u-link>
                        <u-link @click="deleteItem">
                            Delete
                        </u-link>
                    </u-linear-layout>
                </template>
            </u-table-view-column>
        </u-table-view>
        <div>
            <u-linear-layout direction="vertical">
                <u-combo-pagination show-total show-sizer show-jumper
                    :page-size-options="limitList" :total-items="total" :page-size.sync="limit"
                    :page="page" @change="changePage($event)" @change-page-size="changeLimit">
                </u-combo-pagination>
            </u-linear-layout>
        </div>
        <u-footbar :position="batchBtnPos">
            <u-linear-layout>
                <span>{{ selected.length }} items selected</span>
                <u-button :disabled="!allowBatchDelete" @click="batchDelete">Delete</u-button>
            </u-linear-layout>
        </u-footbar>
        <u-edit-desc :modal-name="modalName"></u-edit-desc>
    </u-linear-layout>
</template>
<script>
import page from '@/global/mixins/page/page';
import noticeService from '@/views/dashboard/demo/service';
import UEditDesc from './components/u-edit-desc.vue';
export default {
    components: {
        UEditDesc,
    },
    mixins: [page],
    data() {
        return {
            modalName: 'demo.list.editDesc' + (new Date() - 0),
            selected: [],
            form: {
                search: '',
            },
        };
    },
    computed: {
        allowBatchDelete() {
            return this.selected && this.selected.length;
        },
        batchBtnPos() {
            const pos = this.selected && this.selected.length > 0 ? 'auto' : 'static';
            return pos;
        },
    },
    watch: {
        list() {
            this.selected = [];
        },
        'form.search'() {
            this.resetPage();
            this.refresh();
        },
    },
    methods: {
        loadList() {
            const page = this.getPage();
            return noticeService.loadList({
                query: {
                    page: page.pageNum,
                    search: this.form.search,
                },
            }).then((result) => {
                if (this.form.search) {
                    result = result.filter((item) => JSON.stringify(item).includes(this.form.search));
                }
                const { pageNum, pageSize } = this.getPage();
                this.list = result.slice((pageNum - 1) * pageSize, pageNum * pageSize);
                this.total = result.length;
            });
        },
        batchDelete() {
            this.$confirm(`Confirm to delete ${this.selected.join(',')} instance?`, 'Delete confirmation').then(() => {
                this.refresh();
            }, () => {
                console.log('Cancel deletion');
            });
        },
        createItem() {
            this.$toast.show('Create instance');
        },
        deleteItem() {
            this.$confirm('Are you sure you want to delete this instance?', 'Confirm deletion').then(() => {
                this.$toast.show('Start deletion');
            }, () => {
                this.$toast.show('Cancel deletion');
            });
        },
        editDesc(detail) {
            this.$modal.show(this.modalName, {
                detail,
            });
        },
    },
};
</script>
<style module>
.tableView {
    vertical-align: middle;
}
</style>
