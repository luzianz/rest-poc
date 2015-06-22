declare module 'rest' {
	import restify = require('restify');
	
	export function get(req: restify.Request, res: restify.Response, next: restify.Next);
	export function index(req: restify.Request, res: restify.Response, next: restify.Next);
	export function del(req: restify.Request, res: restify.Response, next: restify.Next);
	export function create(req: restify.Request, res: restify.Response, next: restify.Next);
	export function modify(req: restify.Request, res: restify.Response, next: restify.Next);
}