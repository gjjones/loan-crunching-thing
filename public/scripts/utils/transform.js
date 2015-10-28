function extendToLengthWithValue(list, length, value) {
  if (length > list.length) {
    var padding = [];
    padding.length = length - list.length;
    padding.fill(list[list.length-1]);
    return list.concat(padding);
  }
  return list;
}

module.exports = {
  extendListsToLongest: function (lists) {
    var maxLength = lists.reduce((memo, list) => Math.max(memo, list.length), 0)
    var extendedLists = lists.map(function(list) {
      var lastValue = list[list.length - 1];
      return extendToLengthWithValue(list, maxLength, lastValue);
    });
    return extendedLists;
  },
  combineLists: function (destList, srcList) {
    srcList.forEach(function (value, index) {
      destList[index] = destList[index] ? (destList[index] + value) : value;
    });
    return destList;
  }
}
