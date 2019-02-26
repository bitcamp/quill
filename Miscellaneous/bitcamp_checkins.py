from __future__ import division
import json
import csv
import collections
import operator
def main():
    # To get JSON file from BSON run [bsondump --outFile file_name.json file_name.bson] in terminal
    input_file='./users.json'
    output_file='./checkins_analytics.txt'
    
    schools = {}
   

    arizona = ['Southwest', 'The University of Arizona', 'Arizona State University']
    canada = ['International', 'University of Waterloo', 'University of Saskatchewan', 'University of British Columbia', 'The University of Western Ontario', 'The University of Waterloo', 'The University of Toronto Scarborough', 'The University of Toronto', 'The University of British Columbia', 'Seneca College', 'Ryerson University', 'Queen\'s University', 'Memorial University of Newfoundland', 'McMaster University', 'McGill University', 'Dalhousie University', 'Alexander Mackenzie High School', 'École de technologie supérieure']
    maryland = ['Northeast', 'university of maryland university college', 'eastern technical high school', 'Winston Churchill High School:', 'Walter Johnson', 'University of Maryland', 'University of Maryland - College Park', 'University of Maryland College Park', 'University of Maryland University college', 'University of Maryland, College Park', 'University of Maryland-Baltimore County', 'University of Maryland-College Park', 'UMUC', 'UMD', 'Towson University', 'Thomas S. Wootton High School', 'Thomas Jefferson High School for Science and Technology', 'Thomas Jefferson High School for Science and Technolo', 'The University of Maryland, College Park', 'The University of Maryland, Baltimore County', 'Sherwood High School', 'R. H. Smith School of Business', 'Prince george\'s community college', 'Morgan State University', 'Montgomery County Community College', 'Montgomery College', 'Montgomery Blair High School', 'Maryland Institute College of Art', 'Loyola University Maryland', 'Linganore High School', 'Johns Hopkins University', 'Howard County Community College', 'Howard Community College', 'Goucher college', 'Eleanor Roosevelt High School', 'Dulaney High School', 'Community College of Baltimore County', 'College of Southern Maryland', 'Clarksburg High School', 'Bethesda-Chevy Chase High School', 'Allegany College of Maryland', 'University of Maryland, College Park', 'Atholton High School']
    washington_dc = ['Northeast', 'The George Washington University', 'Howard University', 'Georgetown University', 'Catholic University of America', 'Capitol Interactive', 'American University', 'American University, Washington, D.C.']
    massachusetts = ['Northeast', 'Worcester Polytechnic Institute', 'Wellesley College', 'University of Massachusetts Amherst', 'The University of Massachusetts Amherst:', 'Northeastern University', 'Needham High School', 'Massachusetts Institute of Technology', 'Hult International Business School', 'Harvard University', 'Boston University', 'Babson College']
    new_york = ['Northeast', 'Vaughn College', 'University of Rochester', 'University at Buffalo, SUNY', 'University at Buffalo', 'University at Albany, SUNY', 'The College of Saint Rose', 'Syracuse University', 'Stuyvesant High School', 'Stony Brook University, SUNY', 'Stony Brook University', 'St. John\'s University, New York', 'SUNY at Binghamton', 'Rochester Institute of Technology', 'Rensselaer Polytechnic Institute', 'Queens College, CUNY', 'New York University', 'New York Institute of Technology', 'Macaulay Honors College, CUNY', 'Long Island University', 'Hunter College, CUNY', 'Fullstack Academy of Code (Coding Bootcamp)', 'Fordham University', 'Farmingdale State College', 'Cornell University', 'Cooper Union for the Advancement of Science and Art', 'Cooper Union', 'Columbia University in the City of New York', 'Columbia University', 'Clarkson University', 'Brooklyn College, CUNY', 'Baruch College, CUNY']
    illinois = ['Midwest', 'University of Illinois at Urbana-Champaign', 'University of Illinois at Chicago', 'University of Chicago', 'The University of Illinois at Urbana-Champaign', 'The University of Illinois at Chicago', 'The University of Chicago', 'Monmouth College', 'Illinois Institute of Technology', 'Bradley']
    rhode_island = ['Northeast', 'Johnson & Wales University', 'Brown University']
    california = ['West', 'University of California-Berkeley', 'University of California-Davis', 'University of California-Irvine', 'University of California-Los Angeles', 'University of California-San Diego', 'The University of Southern California', 'The University of California, San Diego', 'The University of California, Riverside', 'The University of California, Los Angeles', 'Stanford University', 'San Jose State University', 'San Diego State University', 'Diablo Valley College', 'California Institute of Technology', 'California Polytechnic State University, San Luis Obispo', 'California State University, Fullerton', 'California State University, Long Beach']
    minnesota = ['Midwest', 'University of Minnesota-Twin Cities', 'The University of St. Thomas', 'The Pennsylvania State University', 'St. Cloud State University', 'Minnesota State University, Mankato', 'Macalester College', 'Carleton College']
    pennsylvania = ['Northeast', 'West chester university', 'West Chester University', 'University of Pittsburgh', 'University of Pennsylvania', 'The University of Pennsylvania', 'Temple University', 'Swarthmore College', 'Pennsylvania State University-Main Campus', 'Messiah College', 'East Stroudsburg University of Pennsylvania', 'East Stroudsburg University', 'East Stroudsberg University', 'East Stroudburg University', 'Drexel University', 'Community College of Philadelphia', 'Carnegie Mellon University']
    ohio = ['Midwest', 'University of Akron Main Campus', 'The University of Toledo', 'Ohio State University-Main Campus', 'Case Western Reserve University']
    vermont = ['Northeast', 'Champlain College']
    virginia = ['Northeast', 'West Virginia University', 'Virginia Polytechnic Institute and State University', 'Virginia Commonwealth University', 'University of Virginia-Main Campus', 'University of Virginia', 'The University of Virginia', 'The College Of William & Mary', 'Strayer University', 'Old Dominion University', 'Oakton High School', 'Northern Virginia Community College', 'Marymount University', 'Hampton University', 'George Mason University', 'College of William and Mary']
    colorado = ['West', 'University of Colorado Boulder', 'The University of Colorado Boulder', 'Colorado School of Mines']
    north_carolina = ['South', 'University of North Carolina at Chapel Hill', 'The University of North Carolina at Chapel Hill', 'North Carolina State University at Raleigh', 'Duke University']
    florida = ['Southeast', 'University of Florida', 'University of Central Florida', 'The University of Florida', 'The University of Central Florida', 'Florida State University', 'Florida International University', 'Florida Institute Of Technology']
    georgia = ['Southeast', 'Kennesaw State University', 'Georgia State University', 'Georgia Institute of Technology-Main Campus', 'Georgia Institute of Technology']
    indiana = ['Midwest', 'Purdue University-Main Campus', 'Indiana University', 'Indiana Uni Bloomington']
    wisconsin = ['Midwest', 'University of Wisconsin-Madison', 'Marquette University', 'Madison College']
    new_jersey = ['Northeast', 'The College of New Jersey', 'Saint Peter\'s University', 'Rowan University', 'Rowan College at Gloucester County', 'Richard Stockton University', 'Ramapo College of New Jersey', 'Princeton University', 'North Brunswick Township High School', 'New Jersey Institute of Technology', 'New Jersey City University', 'Mercer County Community College']
    michigan = ['Midwest', 'washtenaw community college', 'University of Michigan-Ann Arbor', 'Oakland University', 'Michigan State University']
    missouri = ['Midwest', 'Missouri University of Science & Technology']
    washington = ['West', 'University of Washington-Seattle Campus', 'The University of Washington', 'North Seattle College']
    texas = ['Southwest', 'The University of Texas at Dallas', 'The University of Texas at Austin', 'The University of Houston', 'Texas Tech University', 'Texas A&M University', 'Texas A & M University-College Station', 'Southern Methodist University']
    connecticut = ['Northeast', 'Yale University', 'Trinity College']
    alabama = ['Southeast', 'University of Alabama in Huntsville']
    finland = ['International', 'University of Helsinki']
    tennessee = ['Southeast', 'Vanderbilt University']
    utah = ['West', 'Western Governors University']
    india = ['International', 'R.V. College Of Engineering', 'Dwarkadas J. Sanghvi College of Engineering', 'Anna University', 'Arya institute of engineering']

    states = {'Utah': utah, 'Tennessee': tennessee, 'Finland': finland, 'Alabama': alabama, 'Connecticut': connecticut, 'Texas': texas, 'Washington:': washington, 'Missouri': missouri, 'Michigan': michigan, 'New Jersey': new_jersey, 'Wisconsin': wisconsin, 'Indiana': indiana, 'Georgia': georgia, 'Florida': florida, 'North Carolina': north_carolina, 'Colorado': colorado, 'Virginia': virginia, 'Vermont': vermont, 'Ohio': ohio, 'Pennsylvania': pennsylvania, 'Minnesota': minnesota, 'California': california, 'Rhode Island': rhode_island, 'Illinois': illinois, 'New York': new_york, 'Massachusetts': massachusetts, 'Arizona': arizona, 'California': california, 'India': india, 'Canada': canada, 'Maryland': maryland, 'Washington D.C.': washington_dc}
    regions = {'Northeast': {}, 'Southwest': {}, 'Southeast': {}, 'Midwest': {}, 'West': {}, 'International':{}}

    for s in states:
       states[s] = dict.fromkeys(states[s], 0)
       states[s]['hackers'] = 0
       states[s]['schools'] = len(states[s].keys()) - 3
       states[s]['checkedIn'] = 0
       states[s]['reimbursed'] = 0

 
    for r in regions:
       regions[r]['hackers'] = 0
       regions[r]['schools'] = 0
       regions[r]['checkedIn'] = 0
       regions[r]['reimbursed'] = 0


    with open(input_file) as json_file:
        content = json_file.readlines()
        content = [x.strip() for x in content]
        #open file and write to it
        with open(output_file, "w+") as file:
            for x in content:
                data = json.loads(x)
                confirmed = data['status']['confirmed']
                if(confirmed):
                    schoolName = data['profile']['school']
                    checkedInTrue = data['status']['checkedIn']
                    reimbursedTrue = data['status']['reimbursementGiven']
                    if schoolName in schools.keys():
                        schools[schoolName]['registered']=schools[schoolName]['registered']+1
                        if checkedInTrue:
                            schools[schoolName]['checkedIn']=schools[schoolName]['checkedIn']+1
                        if reimbursedTrue:
                            schools[schoolName]['reimbursed']=schools[schoolName]['reimbursed']+1
                    else:
                        schools[schoolName]={}
                        schools[schoolName]['registered']=1
                        schools[schoolName]['checkedIn']=0
                        schools[schoolName]['reimbursed']=0
                        if checkedInTrue:
                            schools[schoolName]['checkedIn']=schools[schoolName]['checkedIn']+1
                        if reimbursedTrue:
                            schools[schoolName]['reimbursed']=schools[schoolName]['reimbursed']+1

            for schoolName in schools:
                for name, state in states.items():
                    if schoolName in state:
                        state['hackers'] += schools[schoolName]['registered']
                        state['schools'] += 1
                        state['checkedIn'] += schools[schoolName]['checkedIn']
                        state['reimbursed'] += schools[schoolName]['reimbursed']


            for name, state in states.items():
                try:
                    state['average'] = state['checkedIn'] / state['hackers']
                except:
                    state['average'] = 0
                for name, region in regions.items():
                    if name in state.keys():
                        region['hackers'] += state['hackers']
                        region['schools'] += state['schools']
                        region['checkedIn'] += state['checkedIn']
                        region['reimbursed'] += state['reimbursed']


            for name, region in regions.items():
                region['average'] = region['checkedIn'] / region['hackers']


            file.write('\n== Region Stats (sorted by avg) ==\n')
            file.write('%-15s %6s %6s %6s %6s %6s\n' % ('REGION', 'SCHOOLS', 'CHECKED IN', 'CONFIRMED','REIMBURSED', 'AVERAGE'))
            sorted_regions = collections.OrderedDict(sorted(regions.items(), key=lambda x:x[1]['hackers'], reverse=True))
            for name, region in sorted_regions.items():
                file.write('%-15s %6d    %6d    %6d %6d         %.2f\n' % (name, region['schools'], region['checkedIn'], region['hackers'], region['reimbursed'],round(region['average'], 2)))

            file.write('\n== State Stats (sorted by avg) ==\n')
            file.write('%-15s %6s %6s %6s %6s %6s\n' % ('STATE', 'SCHOOLS', 'CHECKED IN', 'CONFIRMED','REIMBURSED', 'AVERAGE'))
            sorted_states = collections.OrderedDict(sorted(states.items(), key=lambda x:x[1]['hackers'], reverse=True))
            for name, state in sorted_states.items():
                file.write('%-15s %6d    %6d  %6d    %6d       %.2f\n' % (name, state['schools'], state['checkedIn'],state['hackers'],region['reimbursed'],round(state['average'], 2)))
            file.write('\n')

            file.write('\n== Schools ==\n')
            for schoolName in sorted(schools):
                file.write(schoolName+": "+str(schools[schoolName])+'\n')
 
        file.close()
main()