# rugby-live-reporting-app
 Application to declare the events of a rugby match (scores, substitutions, injuries, etc.)

## TO DO
- Database
  - [ ] Team : name
  - [ ] Game : teamHome, teamVisitor, finalScoreHome, finalScoreVisitor, highlightsHome, highlightsVisitor
  - [ ] Highlight : gameId, teamId, type (try, penalty kick, substition...), time
- Configuration Game Screen: configure the rugby match
  - [x] Form to select home and visitor teams
  - [x] Button to submit form and open "Game Overview Screen"
- Game Overview Screen: watch game overview of the rugby match
  - [ ] Button to start/pause the timer
  - [ ] Button to open "Form Highlight Screen"
- Form Highlight Screen: report highlight of a team
  - [ ] Select field : Team (readonly)
  - [ ] Select field: Highlight Type
  - [ ] Hour field: Time
