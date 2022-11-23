// const baseURL = 'https://www.mxnzp.com/api/news'
const baseURL = 'https://ku.qingnian8.com/dataApi/news'
export default function request(options) {
	/**
	 * @param {object} data 传参
	 * @param {string} method 请求方法
	 * @param {string} url
	 * @param {object} etcs request函数的其他属性
	 */
	const {
		data,
		method,
		url,
		header,
	} = options
	return new Promise(function(resolve, reject) {
		uni.request({
			url: baseURL + url,
			method,
			data,
			// ...etcs,
			header:{
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			dataType: 'json',
			success:(res)=>{
				resolve(res)
			},
			fail:(err)=>{
				reject(err)
			}
		})
	})
}