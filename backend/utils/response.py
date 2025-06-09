from flask import jsonify

class Response:
    @staticmethod
    def success(msg, data=None, code=200):
        return jsonify({
            'msg': msg,
            'success': True,
            'data': data
        }), code
    
    @staticmethod
    def error(msg, code=400):
        return jsonify({
            'msg': msg,
            'success': False,
            'data': None
        }), code