const enum SearchAggregateSearchType {
    BIGGER_THAN = ">",
    SMALLER_THAN = "<",
    RANGE = "r",
    IN_MONGOIDS = "in",
    IN_NUMBERS = "in2",
    IN_STRINGS = "in3",
    REGEX = "s",
    EXISTS = "e"
};

export default SearchAggregateSearchType;