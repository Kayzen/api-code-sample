const credentials = {
	url: '', // DL 360 API Url
	clientId: '', //Client ID provided by Applift
	clientSecret: '', //Client secret provided by Applift
	dlEmail: '', //DL 360 username
	dlPassword: '' //DL 360 password
};

const reportEndpoints = {
	create: {
		url: 'https://applift-test.apigee.net/api/v1/rtb_reports/',
		method: 'POST',
		payload: {
	   		"report":{
			  "advertiser_id": 10896,
		      "name":"RTB test reports data demo",
		      "metrics":[
		         "wins",
		         "impressions",
		         "clicks",
		         "installs",
		         "win_rate",
		         "ctr",
		         "conversion_rate",
		         "platform_ecpm",
		         "platform_ecpc",
		         "platform_ecpi",
		         "platform_spend",
		         "platform_margin",
		         "platform_margin_per"
		      ],
		      "filters":{
		      	"advertiser_id":[10896],
		      	"advertiser_name": ["Applift"]
		      },
		      "group_by":[
		         "line_item_id",
		         "campaign_id"
		      ],
		      "start_date":"2017-08-16",
		      "end_date":"2017-08-22"
		   }
		},
		identifier: 'id'
	},
	update: {
		url: 'https://applift-test.apigee.net/api/v1/rtb_reports/[ID]',
		method: 'PUT',
		payload: {
			"advertiser_id": "",
	   		"report":{
		      "name":"Updated using API",
		      "metrics":[
		         "wins",
		         "impressions",
		         "clicks",
		         "installs",
		         "win_rate",
		         "ctr",
		         "conversion_rate",
		         "platform_ecpm",
		         "platform_ecpc",
		         "platform_ecpi",
		         "platform_spend",
		         "platform_margin",
		         "platform_margin_per"
		      ],
		      "filters":{
		      	"advertiser_id":[10896],
		      	"advertiser_name": ["Applift"]
		      },
		      "group_by":[
		         "line_item_id",
		         "campaign_id"
		      ],
		      "start_date":"2017-08-16",
		      "end_date":"2017-08-22"
		   }
		},
		identifier: 'id'
	},
	read: {
		url: 'https://applift-test.apigee.net/api/v1/rtb_reports/[ID]',
		method: 'GET'
	},
	delete: {
		url: 'https://applift-test.apigee.net/api/v1/rtb_reports/[ID]',
		method: 'DELETE'
	},
	loadReport: {
		url: 'https://applift-test.apigee.net/api/v1/rtb_reports/[ID]/report_results.json',
		method: 'GET'
	}
}

exports.credentials = credentials;
exports.reportEndpoints = reportEndpoints;
