export const postTeam = (team) => (
  $.ajax({
    method: 'POST',
    url: `api/teams`,
    data: JSON.stringify({ team }),
    contentType: 'application/json'
  })
)
