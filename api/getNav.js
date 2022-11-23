import request from '@/api/request.js'
function getNav(){
	return request({
		url: '/navlist.php',
	})
}

export default getNav