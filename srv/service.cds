using Kunde from '../db/data-model';
using Status from '../db/data-model';
using Bestellung from '../db/data-model';

service orderman {

	entity Kunden @(
		title: 'Kunden',
		Capabilities: {
			InsertRestrictions: {Insertable: true},
			UpdateRestrictions: {Updatable: true},
			DeleteRestrictions: {Deletable: true}
		}
	) as projection on Kunde;

	entity Statusn @(
		title: 'Statusn',
		Capabilities: {
			InsertRestrictions: {Insertable: true},
			UpdateRestrictions: {Updatable: true},
			DeleteRestrictions: {Deletable: true}
		}
	) as projection on Status;

	entity Bestellungen @(
		title: 'Bestellungen',
		Capabilities: {
			InsertRestrictions: {Insertable: true},
			UpdateRestrictions: {Updatable: true},
			DeleteRestrictions: {Deletable: true}
		}
	) as projection on Bestellung;

}