import Router from 'koa-router';
import * as postsCtrl from './posts.ctrl';
import checkedLoggedIn from '../../lib/checkLoggedIn';

const posts = new Router();

posts.get('/', postsCtrl.list);
posts.post('/', checkedLoggedIn, postsCtrl.write);

const post = new Router();
post.get('/', postsCtrl.read);
post.delete('/', checkedLoggedIn, postsCtrl.remove);
post.patch('/', checkedLoggedIn, postsCtrl.update);

posts.use('/:id', postsCtrl.getPostById, post.routes());

export default posts;
