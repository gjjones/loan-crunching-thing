function getMaxLengthOfLists(lists) {
	var maxLength = 0;
	lists.forEach(function (list) {
		maxLength = Math.max(Math.ceil(list.length), maxLength); 
	});
	return maxLength;
}
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
		var maxLength = getMaxLengthOfLists(lists);
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