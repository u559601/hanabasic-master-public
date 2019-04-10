type idT: String(10);
type descrT: String(100);
type dateT: Date;

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
