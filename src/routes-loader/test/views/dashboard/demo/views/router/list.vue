<template>
    <u-linear-layout direction="vertical" gap="small">
        <u-page-summary>
            Common Routing Organization Pages
        </u-page-summary>
        <u-linear-layout type="flex" justify="end">
            <u-search v-model="form.search" placeholder="search"></u-search>
        </u-linear-layout>
        <u-table-view :class="$style.tableView" :data="list" :loading="loading" value-field="name">
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
                        <u-link :to="{name: 'demo.router.detail', query: {id: scope.item.ch_name}}">
                            Check the Details
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
                    :page.sync="page" @change="changePage($event)" @change-page-size="changeLimit">
                </u-combo-pagination>
            </u-linear-layout>
        </div>
    </u-linear-layout>
</template>
<script>
import routerPage from '@/global/mixins/page/page.router';
import noticeService from '@/views/dashboard/demo/service';
export default {
    mixins: [routerPage],
    data() {
        return {
            form: {
                search: this.$route.query.search || '',
            },
        };
    },
    watch: {
        'form.search'(search) {
            this.resetPage();
            this.refresh();
            this.$routerLock({
                search: search || undefined,
            });
        },
    },
    methods: {
        loadList() {
            const { pageNum, pageSize } = this.getPage();
            return noticeService.loadList({
                query: {
                    page: pageNum,
                    search: this.form.search,
                },
            }).then((result) => {
                if (this.form.search) {
                    result = result.filter((item) => JSON.stringify(item).includes(this.form.search));
                }
                this.list = result.slice((pageNum - 1) * pageSize, pageNum * pageSize);
                this.total = result.length;
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
