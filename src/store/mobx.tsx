import { observable } from 'mobx'
import { navigate } from '@reach/router'
import moment from 'moment'
import axios from 'axios'

const _url = "https://busse-nestjs-api.herokuapp.com/users/login";

export const Auth = observable({
    email: '',
    password: '',
    showPassword: false,
    error: '',
    token: '',
    createdAt: '',
    expiresAt: '',
    setEmail(email: string) {
        this.email = email
    },
    setPassword(password: string) {
        this.password = password
    },
    setShowPassword() {
        this.showPassword = !this.showPassword
    },
    login() {
        axios.post(_url, {
            email: this.email,
            password: this.password,
        }).then(res => {
            if (res.data) {
                this.error = ''
                this.token = res.data.token
                this.createdAt = res.data.createdAt
                this.expiresAt = res.data.expiresAt
                navigate('/')
            }
        }).catch(err => {
            this.error = err
        })
    },
    logout() {
        this.token = ''
        this.expiresAt = ''
        this.createdAt = ''
    },
    expireToken() {
        if (new Date() > new Date(this.expiresAt)) {
            this.logout()
            navigate("/login")
        }
    }
})

const distinctItems_url =
    "https://busse-nestjs-api.herokuapp.com/sales/distinct/item-list";
const distinctCustomers_url =
    "https://busse-nestjs-api.herokuapp.com/sales/distinct/cust-list";
const _salesSummaryByItemUrl =
    "https://busse-nestjs-api.herokuapp.com/sales/summary/item";
const _fetchIndividualSalesByItemUrl =
    "https://busse-nestjs-api.herokuapp.com/sales/item";
const _fetchIndividualSalesByCustUrl =
    "https://busse-nestjs-api.herokuapp.com/sales/cust";
const _fetchSalesDataUrl =
    "https://busse-nestjs-api.herokuapp.com/sales/distinct/cust";
const _fetchItemsDataUrl =
    "https://busse-nestjs-api.herokuapp.com/sales/distinct/item";

const currentYear = new Date().getFullYear();
const lastMonth = new Date().getMonth();
const minDate = moment(new Date(currentYear, lastMonth - 1, 1, 0, 0, 0)).toISOString()
const maxDate = moment(new Date(currentYear, lastMonth, 0, 0, 0, 0)).toISOString()
// const minDate = new Date(currentYear, lastMonth - 1, 1, 0, 0, 0).toISOString().substring(0, 10);
// const maxDate = new Date(currentYear, lastMonth, 0, 0, 0, 0).toISOString().substring(0, 10);


export const Params = observable({
    error: '',
    get token() {
        return Auth.token
    },
    start: minDate,
    end: maxDate,
    setStart(date: string) {
        if (new Date(date) < new Date(this.end)) {
            this.start = date
            this.error = ''
        } else {
            this.error = 'Start date should be lesser than End date.'
        }
    },
    setEnd(date: string) {
        if (new Date(date) > new Date(this.start)) {
            this.end = date
            this.error = ''
        } else {
            this.error = 'End date should be greater than Start date'
        }
    },
    get numOfDays() {
        return (
            (new Date(this.end).getTime() - new Date(this.start).getTime()) /
            (1000 * 60 * 60 * 24)
        );
    },
})

export const Data = observable({
    error: '',
    loading: false,
    item: "",
    customer: "",
    cid: "",
    iid: "",
    setItem(item: string) {
        this.item = item;
    },
    setCustomer(customer: string) {
        this.customer = customer;
    },
    setCid(cid: string, customer: string) {
        this.cid = cid + " | " + customer;
    },
    setIid(iid: string, item: string) {
        this.iid = iid + " | " + item;
    },
    distinctCustomersArray: [],
    distinctItemsArray: [],
    distinctCustomers() {
        if (Params.token) {
            axios
                .get(`${distinctCustomers_url}/${Params.start}/${Params.end}`, {
                    headers: { Authorization: `Bearer ${Params.token}` }
                })
                .then(res => {
                    if (res.data) {
                        this.distinctCustomersArray = res.data[0].customer;
                        this.error = ''
                    }
                }).catch(err => {
                    this.error = err
                });
        }
        this.distinctCustomersArray = [];
    },
    distinctItems() {
        if (Params.token) {
            axios
                .get(`${distinctItems_url}/${Params.start}/${Params.end}`, {
                    headers: { Authorization: `Bearer ${Params.token}` }
                })
                .then(res => {
                    if (res.data) {
                        this.distinctItemsArray = res.data[0].item;
                        this.error = ''
                    }
                }).catch(err => {
                    this.error = err
                });
        }
        this.distinctItemsArray = [];
    },
    summary: [],
    customerDetails: [],
    itemDetails: [],
    individualItems: [],
    chartCustomers: [] as string[],
    chartSales: [] as number[],
    fetchSummary(iid: string) {
        this.loading = true;
        axios
            .all([
                axios.get(
                    `${_salesSummaryByItemUrl}/${iid}/${Params.start}/${Params.end}`,
                    {
                        headers: {
                            Authorization: `Bearer ${Params.token}`
                        }
                    }
                ),
                axios.get(
                    `${_fetchIndividualSalesByItemUrl}/${iid}/${Params.start}/${Params.end}`,
                    {
                        headers: {
                            Authorization: `Bearer ${Params.token}`
                        }
                    }
                )
            ])
            .then(
                axios.spread((summaryRes, detailsRes) => {
                    let c: string[] = []
                    let s: number[] = []

                    detailsRes.data.forEach(function (value: any) {
                        c.push(value._id.customer)
                        s.push(value.sales)
                    })

                    this.summary = summaryRes.data;
                    this.individualItems = detailsRes.data;
                    this.chartCustomers = c;
                    this.chartSales = s;
                    this.loading = false;
                })
            );
    },
    fetchPeriodData() {
        this.loading = true;
        axios
            .all([
                axios.get(`${_fetchSalesDataUrl}/${Params.start}/${Params.end}`, {
                    headers: {
                        Authorization: `Bearer ${Params.token}`
                    }
                }),
                axios.get(`${_fetchItemsDataUrl}/${Params.start}/${Params.end}`, {
                    headers: {
                        Authorization: `Bearer ${Params.token}`
                    }
                })
            ])
            .then(
                axios.spread((salesData, itemsData) => {
                    this.customerDetails = salesData.data;
                    this.itemDetails = itemsData.data;

                    this.loading = false;
                })
            );
    },
    individualSales: [],
    fetchIndividualSalesByCust(cid: string) {
        this.loading = true;
        axios
            .get(
                `${_fetchIndividualSalesByCustUrl}/${cid}/${Params.start}/${Params.end}`,
                {
                    headers: {
                        Authorization: `Bearer ${Params.token}`
                    }
                }
            )
            .then(res => {
                if (res.data) {
                    this.individualSales = res.data;
                    this.loading = false;
                    this.error = ''
                }
            }).catch(err => {
                this.error = err
            })
    },
    fetchIndividualSalesByItem(iid: string) {
        this.loading = true;
        axios
            .get(
                `${_fetchIndividualSalesByItemUrl}/${iid}/${Params.start}/${Params.end}`,
                {
                    headers: {
                        Authorization: `Bearer ${Params.token}`
                    }
                }
            )
            .then(res => {
                if (res.data) {
                    this.individualItems = res.data;
                    this.loading = false;
                    this.error = ''
                }
            }).catch(err => {
                this.error = err
            })
    }
})

