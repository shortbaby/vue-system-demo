/**
 * @fileOverview api
 * @author XiaoBin Li(lixiaobin@baijiahulian.com)
 */

exports.routes = [
	{
		method: 'POST',
		path: '/stationMessageQuery/queryAllNewCount.json',
		handler: function (request, reply) {
			return reply(require('./json/station/queryAllNewCount.json'))
		}
	},
	{
		method: 'POST',
		path: '/stationMessageQuery/queryBatch.json',
		handler: function (request, reply) {
			return reply(require('./json/station/queryBatch.json'))
		}
	},
	{
		method: 'POST',
		path: '/stationMessageQuery/queryNewByMinId.json',
		handler: function (request, reply) {
			return reply(require('./json/station/queryNewByMinId.json'))
		}
	},
	{
		method: 'POST',
		path: '/stationMessageQuery/readBatch.json',
		handler: function (request, reply) {
			return reply(require('./json/station/readBatch.json'))
		}
	},
];