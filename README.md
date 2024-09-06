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
  - [x] Button to start/pause the timer
  - [x] Button to open "AddHighlight Screen"
  - [ ] Change button "Quit" to "End half time" when "Start" button clicked
    - [ ] Add half time state (1 or 2) in store
    - [ ] update timer to 40:00 and update half state to 2
  - [ ] Change button "End half time" to "Quit" when "End half time" button is clicked
  - [ ] Change button "Quit" to "End game" when "Start" button is clicked
  - [ ] On click "End game" : display alert to confirm end game, reset store, redirect to home
  - [ ] //More : Two buttons to open "AddHighlight Screen" with team already selected
- AddHighlight Screen: report highlight of a team
  - [x] Two tabs (Highlight, Players)
  - [x] Tab Highlight
    - [x] Radio buttons : Team
    - [x] Select field: ScoringHighlight Type (try, convertedTry, penaltyTry, penalty, dropGoal)
    - [x] Select field : Time (1 to 80)
      - [x] Default value according to timer
    - [x] Validate form
      - [x] Error no team selected
      - [x] Error no minute selected
      - [x] Error no highlight data found
  - [ ] Tab Players
    - [x] Radio buttons : Team
    - [x] Select field: DisciplinaryHighlight|SubstitutionHighlight Type (yellowCard, redCard | substitution )
    - [x] Select field : Time (1 to 80)
      - [x] Default value according to timer
    - [x] Select field: Player involved if DisciplinaryHighlight selected
    - [x] Select field: Player substituted if SubstitutionHighlight selected
    - [x] Select field: Player substitute if SubstitutionHighlight selected
    - [x] Validate form
      - [x] Error no team selected
      - [x] Error no minute selected
      - [x] Error no highlight data found
      - [x] Error no player involved|substituted
      - [x] Error no player substitute if SubstitutionHighlight selected
