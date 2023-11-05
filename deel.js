const axios = require('axios');
const sendNotification = require('./sendNotification');

const query = `
query ApiJobBoardWithTeams($organizationHostedJobsPageName: String!) {
  jobBoard: jobBoardWithTeams(
        organizationHostedJobsPageName: $organizationHostedJobsPageName
          ) {
                teams {
                  id
                  name
                  parentTeamId
                  __typename
              }
              jobPostings {
                  id
                  title
                  teamId
                  locationId
                  locationName
                  employmentType
                compensationTierSummary
                __typename
            }
              __typename
          }
        }
`;

const deelChecker = async () => {
    const {
        data
    } = await axios.post(
        `https://jobs.ashbyhq.com/api/non-user-graphql?op=ApiJobBoardWithTeams`, {
            origin: 'https://jobs.ashbyhq.com',
                operationName: "ApiJobBoardWithTeams",
                variables: {
                    "organizationHostedJobsPageName": "Deel"
                },
                query,
        }
    );

    
    const jobPostings = data.data.jobBoard.jobPostings;

    const jobPostingsForBackend = jobPostings.filter(job => job.title.toLowerCase().includes('Backend'.toLocaleLowerCase()));
    const jobPostingsForFrontend = jobPostings.filter(job => job.title.toLowerCase().includes('Frontend'.toLocaleLowerCase()));
    const jobPostingsForFullstack = jobPostings.filter(job => job.title.toLowerCase().includes('Fullstack'.toLocaleLowerCase()));

    const message = `<b>Deel has ${jobPostings.length} job postings.</b>\n\nBackend: ${jobPostingsForBackend.length}\nFrontend: ${jobPostingsForFrontend.length}\nFullstack: ${jobPostingsForFullstack.length}\n\nCheck it out: https://jobs.ashbyhq.com/Deel?departmentId=8c27e7fa-f898-4de1-adf6-70c67c1e1c11`;

    await sendNotification(message);

    return 0;
}

module.exports = deelChecker;