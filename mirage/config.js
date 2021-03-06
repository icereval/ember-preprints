import config from 'ember-get-config';

export default function() {

    // Allow certain live hosts to be reached without mirage errors.
    this.passthrough(config.OSF.url + '**');
    this.passthrough(config.OSF.apiUrl + '/**');
    this.passthrough(config.OSF.oauthUrl + '/**');
    this.passthrough(config.OSF.renderUrl + '/**');
    this.passthrough(config.OSF.waterbutlerUrl + '**');
    this.passthrough(config.OSF.helpUrl + '/**');

    // All routes defined below will be namespaced under /api , to avoid mirage "Cannot GET" errors when accessing
    // top level preprints route
    this.namespace = '/preprints';

    this.post('/preprints');

    this.get('/preprints/:id', (schema, request) => {
        let id = request.params.id;
        return schema.preprints.find(id);
    });

    this.get('/preprints', (schema, request) => schema.preprints.where(request.queryParams));

    this.get('/subjects', (schema, request) => {
        return schema.subjects.where(request.queryParams);
    });

    this.get('/taxonomies', (schema, request) => schema.taxonomies.all());

    this.get('/taxonomies/:id', (schema, request) => {
        let id = request.params.id;
        return schema.taxonomies.find(id);
    });
}
