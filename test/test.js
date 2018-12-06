import assert from 'assert';
import request from 'supertest';
import { httpServer, app } from '../server/index';
const agent = request.agent(app);

app.on('app_started', () => {
	console.log('started')
})


before(function (done) {
	console.log('hi')
  app.on("app_started", function() { done(); })
})

after(function (done){
  httpServer.close(done);
})

describe('server testing', () => {
  it('responds to /version', function (done) {
    agent.get('/version').expect(200, done);
  })
  it('responds to /api/ping', function (done) {
    agent.get('/api/ping').expect({res: 'pong'}, done);
  })
});

