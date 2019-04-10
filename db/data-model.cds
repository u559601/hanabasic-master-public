type idT: String(10);
type descrT: String(100);
type dateT: Date;
type mengeT: Integer;

entity Kunde {
  key KID: idT;
  Name: descrT not null;
}

entity Status {
  key SID: idT;
  Status: descrT not null;
}

entity Bestellung {
  key BID: idT;
  Bestelldatum: dateT not null;
  KID: Association to Kunde  not null;
  SID: Association to Status  not null;
}

entity Bestellposition {
  key PID: idT;
  Menge: mengeT not null;
  BID: Association to Bestellung  not null;
  AID: Association to Artikel  not null;
}

entity Artikel {
  key AID: idT;
  Beschreibung: descrT not null;
}

