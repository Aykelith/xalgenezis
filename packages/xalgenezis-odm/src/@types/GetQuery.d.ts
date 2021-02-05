interface GetQuery {
    [field: string]: string | number | Date | ID | { $exists?: boolean }
}
