import request from '@/api/request.js'

function getContent(data){
	return request({
		url: '/newslist.php',
		data
	})
}
export default getContent