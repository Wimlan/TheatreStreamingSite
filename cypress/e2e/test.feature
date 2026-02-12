Feature: Spela video knapp

När man är inne på en föreställnings detaljsida så ska det finnas en knapp som
heter SPELA UPP. När man klickar på den knappen så ska ett modul fönster med en video visas.

Scenario: Går in på detaljsidan och trycker på spela upp
  Given Jag går in på en föreställnings detaljsida
  When Jag klickar på knappen SPELA UPP
  Then Ett fönster med en video visas
