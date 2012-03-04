var armory = require('../').defaults({ region: 'us' });

module.exports = {

    'all US realms': function(test) {
        armory.realmStatus(function(err, realms) {
            test.ifError(err);
            test.ok(Array.isArray(realms));
            test.ok(realms.length > 1);
            test.ok(realms[0].slug);

            test.done();
        });
    },

    'all US realms with locale': function(test) {
        armory.realmStatus({ locale: 'es_MX' }, function(err, realms) {
            test.ifError(err);
            test.ok(Array.isArray(realms));
            test.ok(realms.length > 1);
            test.ok(realms[0].slug);

            test.done();
        });
    },

    'all EU realms': function(test) {
        armory.realmStatus({ region: 'eu' }, function(err, realms) {
            test.ifError(err);
            test.ok(Array.isArray(realms));
            test.ok(realms.length > 1);
            test.ok(realms[0].slug);

            test.done();
        });
    },

    'all EU realms with locale': function(test) {
        armory.realmStatus({
            region: 'eu',
            locale: 'fr_FR'

        }, function(err, realms) {
            test.ifError(err);
            test.ok(Array.isArray(realms));
            test.ok(realms.length > 1);
            test.ok(realms[0].slug);

            test.done();
        });
    },

    'single US realm': function(test) {
        armory.realmStatus('Shadowmoon', function(err, realms) {
            test.ifError(err);
            test.ok(Array.isArray(realms));

            realms = realms[0];
            test.equal(realms.name, 'Shadowmoon');
            test.equal(realms.slug, 'shadowmoon');

            test.done();
        });
    },

    'single EU realm': function(test) {
        armory.realmStatus({
            name: 'Свежеватель Душ',
            region: 'eu'

        }, function(err, realms) {
            test.ifError(err);
            test.ok(Array.isArray(realms));

            realms = realms[0];
            test.equal(realms.name, 'Soulflayer');
            test.equal(realms.slug, 'soulflayer');

            test.done();
        });
    },

    'single EU realm with locale': function(test) {
        armory.realmStatus({
            name: 'Свежеватель Душ',
            region: 'eu',
            locale: 'ru_RU'

        }, function(err, realms) {
            test.ifError(err);
            test.ok(Array.isArray(realms));

            realms = realms[0];
            test.equal(realms.name, 'Свежеватель Душ');
            test.equal(realms.slug, 'свежеватель-душ');

            test.done();
        });
    },

    'multiple US realms': function(test) {
        armory.realmStatus(['Cho\'gall', 'Shadowmoon'], function(err, realms) {
            test.ifError(err);
            test.ok(Array.isArray(realms));
            test.equal(realms.length, 2);

            test.equal(realms[0].name, 'Shadowmoon');
            test.equal(realms[0].slug, 'shadowmoon');
            test.equal(realms[1].name, 'Cho\'gall');
            test.equal(realms[1].slug, 'chogall');

            test.done();
        });
    },

    'multiple EU realms': function(test) {
        armory.realmStatus({
            name: ['Свежеватель Душ', 'Festung der Stürme'],
            region: 'eu'

        }, function(err, realms) {

            test.ifError(err);
            test.ok(Array.isArray(realms));
            test.equal(realms.length, 2);

            test.equal(realms[0].name, 'Soulflayer');
            test.equal(realms[0].slug, 'soulflayer');
            test.equal(realms[1].name, 'Festung der Stürme');
            test.equal(realms[1].slug, 'festung-der-sturme');

            test.done();
        });
    },

    'non-existent realm': function(test) {
        armory.realmStatus('foo', function(err, realms) {
            test.ifError(err);
            test.ok(realms.length > 1);

            test.done();
        });
    }
};
