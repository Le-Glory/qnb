import request from '@/api/request.js'

function getDetail(data){
	return request({
		url: '/detail.php',
		data
	})
}
export default getDetail