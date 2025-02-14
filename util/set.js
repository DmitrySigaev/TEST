/* start of file ->*/
ls = __filename.lastIndexOf('/');
rs = __filename.lastIndexOf('\\');
__filename = __filename.substring((((ls >= 0)? ls + 1: 0) | ((rs >= 0)? rs + 1: 0)), __filename.length);
console.log('[' + __filename + ']' + ": starting");
exports.done = false;
/* start of file <- */
/* ----------------------------------------- */

var Set = {
	empty: function () {
		return {};
	},

	single: function (item) {
		var set = {};
		Set.add(set, item);
		return set;
	},

	size: function (set) {
		var cnt = 0;
		for (var id in set) {
			if (set[id] !== Object.prototype[id]) {
				cnt++;
			}
		}
		return cnt;
	},

	contains: function (set, v) {
		return typeof (set[v]) !== 'undefined' && set[v] !== Object.prototype[v];
	},

	subset: function (subset, superset) {
		for (var id in subset) {
			if (subset[id] !== Object.prototype[id]) {
				if (superset[id] !== subset[id]) {
					return false;
				}
			}
		}
		return true;
	},

	intersection: function (set1, set2) {
		var set = {};
		for (var id in set1) {
			if (set1[id] !== Object.prototype[id]) {
				if (set2[id] === set1[id]) {
					Set.add(set, id);
				}
			}
		}
		return set;
	},

	disjoint: function (set1, set2) {
		for (var id in set1) {
			if (set1[id] !== Object.prototype[id]) {
				if (set2[id] === set1[id]) {
					return false;
				}
			}
		}
		return true;
	},

	eq: function (set1, set2) {
		return Set.subset(set1, set2) && Set.subset(set2, set1);
	},

	each: function (set, func, context) {
		for (var v in set) {
			if (set[v] !== Object.prototype[v]) {
				func.call(context, set[v]);
			}
		}
	},

	filter: function (set, func, context) {
		var subset = {};
		for (var v in set) {
			if (set[v] !== Object.prototype[v]) {
				if (func.call(context, set[v])) {
					subset[set[v]] = set[v];
				}
			}
		}
		return subset;
	},

	pick: function (set) {
		for (var v in set) {
			if (set[v] !== Object.prototype[v]) {
				return set[v];
			}
		}
		return null;
	},

	list: function (set) {
		var list = [];
		for (var v in set) {
			if (set[v] !== Object.prototype[v]) {
				list.push(set[v]);
			}
		}
		return list;
	},

	add: function (set, item) {
		set[item] = item;
	},

	mergeIn: function (set, other) {
		Set.each(other, function (item) {
			Set.add(set, item);
		});
	},

	remove: function (set, item) {
		var v = set[item];
		delete set[item];
		return v;
	},

	clone: function (other) {
		var set = {};
		Set.mergeIn(set, other);
		return set;
	},

	fromList: function (list) {
		var set = {};
		if (list) {
			for (var i = 0; i < list.length; ++i) {
				set[list[i] - 0] = list[i] - 0;
			}
		}
		return set;
	},

	keySetInt: function (map) {
		var set = {};
		map.each(function (id) {
			set[id - 0] = id - 0;
		});
		return set;
	},

	find: function (set, func, context) {
		for (var v in set) {
			if (set[v] !== Object.prototype[v]) {
				if (func.call(context, set[v])) {
					return v;
				}
			}
		}
		return null;
	}
};


module.exports = Set;

/* ----------------------------------------- */

/*end of file ->*/
exports.done = true;
console.log('[' + __filename + ']' + ": done.");
/*end of file <-*/
