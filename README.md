# rugby-live-reporting-app
Application to declare the events of a rugby match (scores, substitutions, injuries, etc.)

## Stack
React Native, Typescript

## TO DO
- Database
  - [ ] Team : name
  - [x] Game : teamHome, teamVisitor, scoreHome, scoreVisitor, highlightsHome, highlightsVisitor
  - [ ] Highlight : gameId, teamId, type (try, penalty kick, substition...), time
- Configuration Game Screen: configure the rugby match
  - [x] Form to select home and visitor teams
  - [x] Button to submit form and open "Game Overview Screen"
- Game Overview Screen: watch game overview of the rugby match
  - [ ] Button to start/pause the timer
  - [x] Button to open "AddHighlight Screen"
  - [ ] //More : Two buttons to open "AddHighlight Screen" with team already selected
- AddHighlight Screen: report highlight of a team
  - [ ] Two tabs (Highlight, Players)
  - [ ] Tab Highlight
    - [x] Radio buttons : Team
    - [x] Select field: ScoringHighlight Type (try, convertedTry, penaltyTry, penalty, dropGoal)
    - [x] Select field : Time (1 to 80)
      - [ ] Default value according to timer
    - [ ] Validate form
      - [ ] Error no team selected
      - [ ] Error no minute selected
      - [ ] Error no highlight data found
  - [ ] Tab Players
    - [x] Radio buttons : Team
    - [ ] Select field: PlayerHighlight|SubstitutionHighlight Type (yellowCard, redCard | substitution )
    - [ ] Select field : Time (1 to 80)
      - [ ] Default value according to timer
    - [ ] Select field: Player involved|substituted
    - [ ] Select field: Player substitute if SubstitutionHighlight selected
    - [ ] Validate form
      - [ ] Error no team selected
      - [ ] Error no minute selected
      - [ ] Error no highlight data found
      - [ ] Error no player involved|substituted
      - [ ] Error no player substitute if SubstitutionHighlight selected
