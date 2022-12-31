//////////////////////////////////////////// EXTRACT

// URL:https://starbucks.taleo.net/careersection/1000222retail/moresearch.ftl?lang=en&keyword=&searchCategory=retail&dropListSize=10

(async () => {
    const out = {};
    const jobs = [];

    if (!pass_it.count) {
        out.pass_it = {
            count: 1,
            limit: 0,
        };
    } else {
        out.pass_it = pass_it;
    }

    const urlRequest = `https://starbucks.taleo.net/careersection/1000222retail/moresearch.ajax`;
    const body =
        `iframemode=1&ftlpageid=reqListAdvancedPage&ftlinterfaceid=requisitionListInterface&ftlcomp` +
        `id=rlPager&jsfCmdId=rlPager&ftlcompclass=PagerComponent&ftlcallback=ftlPager_processRespon` +
        `se&ftlajaxid=ftlx2&rlPager.currentPage=${out.pass_it.count}&lang=en&ftlhistory=1651174930741%7C3.0.7.6.19.21.` +
        `22.3.20.16&ftlPageHistory=&ftlstate=&ftlwinscr=325&ftlerrors=&portal=&tz=GMT-05%3A00&skipA` +
        `lternate=&iniurl.src=&iniurl.media_id=&iniurl.sns_id=&iniurl.use_up=&iniurl.refid=&iniurl.` +
        `evtr=&iniurl.isSocialSrc=&radiusSiteListPagerId.nbDisplayPage=5&locations.count=1&computeS` +
        `iteListAction.unit=0&canDisplayFacebookButton=false&rlPager.refreshMessageLabel=The+list+o` +
        `f+jobs+has+reloaded.+%7B0%7D+%E2%80%93+%7B1%7D+of+%7B2%7D.+Page+%7B3%7D&actAddJobToCart.re` +
        `quisitionNo=&calloutPageDisplayed=false&radiusSiteListPagerId.pagerLabelPrevious=Previous&` +
        `confirmBeaconReset.aor=false&careerPortalFullVersionURL=&actOnReqReferralProfilerAgentReqL` +
        `ist.mode=&udf5Menu.selected=&emptyListToken=&udf9Menu.selected=&siteListId=&radiusSiteList` +
        `PagerId.currentPage=1&actDisplayReferralProfiler.requisitionNo=&csrftoken=%2FAof%2BH0IyLQy` +
        `cZh1Sr1YLXABYVicH4Brld7HTJBvHTs%3D&rlPager.pagerLabelAfterNextHidden=+&actOnReqReferralApp` +
        `lyReqList.mode=&rlPager.requisitionNo=&listLocales=en%2Cfr&countryPanelErrorDrawer.state=f` +
        `alse&rssLocationIconTT=This+criteria+can+be+used+for+RSS+feed+creation%3A+%3F%3FLocation%3` +
        `F%3F&rlPager.pagerLabelPreviousTT=Go+to+the+previous+page&interfaceIdForTimeZone=requisiti` +
        `onListInterface&displayUrgentNeed=true&isExternal=true&navigate.url=&careerPortalFullVersi` +
        `onURLEnabled=false&initialHistoryOld=&tabLocationPatch=true&studyLevelMenu.selected=&rssJo` +
        `bFieldIconTT=This+criteria+can+be+used+for+RSS+feed+creation%3A+%3F%3FJobField%3F%3F&radiu` +
        `sSiteListId.nbElements=0&udf1Menu.selected=&hideLinkTitle=Hide+Search+Criteria&radiusSiteL` +
        `istId.hasElements=false&cshtstate=110900%7C&mLastActiveMode=reqListAdvancedPage&displayDra` +
        `ft=true&isEnabled=true&commonDescriptionForAddThis=&descriptionLogginMandatory=false&ftlIS` +
        `WLDMessage=&jobScheduleMenu.selected=&listContenDescriptionTT=&pBeaconBeat=300000&actOnReq` +
        `ReferralProfilerAgentReqList.requisitionNo=&listRequisition.nbElements=19999&actOpenRequis` +
        `itionDescription.openDescFrom=default&rlPager.pagerLabelTT=Go+to+page+%7B0%7D&radiusSiteLi` +
        `stPagerId.pagerLabelTT=Go+to+page+%7B0%7D&rssRadiusIconTT=This+criteria+can+be+used+for+RS` +
        `S+feed+creation%3A+Zip%2FPostal+Code+Radius&udf4Menu.selected=&udf6Menu.selected=&tabLevel` +
        `2b.selected=&showLinkTitle=Show+Search+Criteria&locationMenu.selected=tabLocation&radiusAc` +
        `tive=false&initialHistoryPage=1&pSessionWarning=2400000&postedDateMenu.selected=&rlPager.p` +
        `agerLabelNextTT=Go+to+the+next+page&radiusSiteListPagerId.pagerLabelBeforeNextHidden=+&job` +
        `boardListPageTitle=Job+Search+-+Advanced+Search&alreadyAppliedColumnDisplayed=true&udf8Men` +
        `u.selected=&computeSiteListAction.locationSiteId=0&actDisplayReferralProfiler.mode=&jobCar` +
        `tIcon=bag_black.gif&jobTypeMenu.selected=&confirmOverwrite.aor=false&actOnReqReferralApply` +
        `ReqList.candidateNo=&listCount=&radiusSiteListPagerId.pagerLabelPreviousTT=Go+to+the+previ` +
        `ous+page&radiusSiteListId.isEmpty=true&radiusSiteListPagerId.pageLabelAfterHidden=+&rlPage` +
        `r.pagerLabelCount=Go+to+page+%7B0%7D&organizationMenu.selected=&rlPager.pagerLabelPrevious` +
        `=Previous&actDisplayReferralProfiler.candidateNo=&canDisplayRSSButton=true&applicationCand` +
        `idateNo=&radiusLocationEmpty=false&confirmBeaconTimedOut.aor=false&computeSiteListAction.s` +
        `iteListId=&organizations.count=1&mySavedSearchesPageLink.url=&actOnReqReferralApplyReqList` +
        `.requisitionNo=&displaymessage=false&confirmBeaconReset.a=&radiusSiteListPagerId.pagerLabe` +
        `lNextTT=Go+to+the+next+page&employeeStatusMenu.selected=&confirmOverwrite.a=&listLabels=En` +
        `glish+%2819999%29%2CFrench+%28154%29&zipcodePanelErrorDrawer.state=false&ftlISWLD=false&na` +
        `vigate.target=&isListEmpty=false&serializedCriteria=19%3A%3A%3B%3B20%3A%3A%3B%3B21%3A%3A%3` +
        `B%3B&displayAsMainHeader=false&udf3Menu.selected=&rlPager.listId=listRequisition&locationS` +
        `iteId=0&jobsPerPageCaption=Results+per+page&radiusSiteListPagerId.pagerLabelAfterPreviousH` +
        `idden=+&computeSiteListAction.zipcode=&rlPager.pageLabelBeforeHidden=+&savecriteria.state=` +
        `false&udf7Menu.selected=&radiusSiteListPagerId.pageLabelBeforeHidden=+&radiusSiteListDrawe` +
        `r.state=false&actOnReqApplyReqList.mode=&showLinkTitleTT=Show+the+search+criteria&radiusSi` +
        `teListPagerId.pagerLabelNext=Next&listRequisition.hasElements=true&radiusSiteListPagerId.p` +
        `agerLabelBeforePreviousHidden=+&isApplicantUser=true&actOnReqReferralProfilerAgentReqList.` +
        `candidateNo=&udf2Menu.selected=&urgentMenu.selected=&tabLevel1.selected=tabJS&zipcode=&isI` +
        `nternal=false&radiusSiteListPagerId.listId=&listEmptyIsApplicantUser=false&udf10Menu.selec` +
        `ted=&rlPager.pageLabelAfterHidden=+&errorMessageDrawer.state=false&computeSiteListAction.d` +
        `istance=0&rlPager.pagerLabelBeforePreviousHidden=+&jobFieldMenu.selected=tabJobField&radiu` +
        `sSiteListPagerId.refreshMessageLabel=The+list+of+jobs+has+reloaded.+%7B0%7D+%E2%80%93+%7B1` +
        `%7D+of+%7B2%7D.+Page+%7B3%7D&radiusSiteListPagerId.pagerLabelCount=Go+to+page+%7B0%7D&conf` +
        `irmBeaconTimedOut.a=&rlPager.pagerLabelAfterPreviousHidden=+&distance=0&listRequisition.si` +
        `ze=100&radiusSiteListPagerId.requisitionNo=&displayCalloutInLegend=false&listRequisition.i` +
        `sEmpty=false&jobLevelMenu.selected=&rlPager.nbDisplayPage=5&requisitionno=&radiusSiteListP` +
        `agerId.pagerLabelAfterNextHidden=+&radiusSiteListId.size=5&canDisplaySavedSearchHelp=false` +
        `&radiusContryName=&tabLevel2a.selected=tabAdvancedReqSearch&willTravelMenu.selected=&jobSh` +
        `iftMenu.selected=&hideLinkTitleTT=Hide+the+search+criteria&pSessionTimeout=3600000&addThis` +
        `Required=true&jobListName=requisitionList&focusOnField=&rlPager.pagerLabelNext=Next&actOnR` +
        `eqApplyReqList.candidateNo=&restoreInitialHistoryOnRefresh=false&rlPager.pagerLabelBeforeN` +
        `extHidden=+&jobfields.count=1&signedIn=false&initialHistory=ftlx0%21%7C%21jobsearch_proces` +
        `sSearchInitialHistory%21%2524%21requisitionListInterface%21%7C%21listRequisition%21%7C%21r` +
        `lPager%21%2524%21false%21%7C%21false%21%7C%21false%21%7C%21false%21%7C%21792638%21%7C%21ba` +
        `rista+-+Store%23+04997%2C+DICKSON+CROSSING+-+AIRDRIE%21%7C%21792638%21%7C%21barista+-+Stor` +
        `e%23+04997%2C+DICKSON+CROSSING+-+AIRDRIE%21%7C%21792638%21%7C%21CA-AB-Airdrie-Dickson+Cros` +
        `sing+%28Store%23+04997%29%21%7C%21false%21%7C%21%21%7C%21%21%7C%21%21%7C%21%21%7C%21Apply%` +
        `21%7C%21Apply+for+this+position+%28shift+supervisor+-+Store%23+04997%2C+DICKSON+CROSSING+-` +
        `+AIRDRIE%29%21%7C%21792637%21%7C%21true%21%7C%21Re-apply%21%7C%21Re-apply+for+this+job%21%` +
        `7C%21792637%21%7C%21false%21%7C%21false%21%7C%21792637%21%7C%21false%21%7C%21false%21%7C%2` +
        `1Submission+for+the+position%255C%3A+shift+supervisor+-+Store%23+04997%2C+DICKSON+CROSSING` +
        `+-+AIRDRIE+-+%28Job+Number%255C%3A+160003950%29%21%7C%21false%21%7C%21true%21%7C%21Add+to+` +
        `My+Jobs%21%7C%21Add+this+position+to+the+job+cart%255C%3A+shift+supervisor+-+Store%23+0499` +
        `7%2C+DICKSON+CROSSING+-+AIRDRIE%21%7C%21792637%21%7C%21false%21%7C%21true%21%7C%21true%21%` +
        `7C%21https%255C%3A%2F%2Fstarbucks.taleo.net%2Fcareersection%2Fjobdetail.ftl%3Fjob%3D160003` +
        `122%2526lang%3Den%21%7C%21shift+supervisor+-+Store%23+04457%2C+Banff+Avenue%21%7C%21true%2` +
        `1%2524%21ftlerrors%21%7C%21%21%7C%21listRequisition.size%21%7C%2110%21%7C%21listRequisitio` +
        `n.nbElements%21%7C%2119999%21%7C%21listRequisition.isEmpty%21%7C%21false%21%7C%21listRequi` +
        `sition.hasElements%21%7C%21true%21%7C%21pSessionTimeout%21%7C%210%21%7C%21pSessionWarning%` +
        `21%7C%210%21%7C%21pBeaconBeat%21%7C%210%21%7C%21focusOnField%21%7C%21%21%7C%21csrftoken%21` +
        `%7C%21Ne36cSNjdVCCMbv%2FdP9Bf87fjkaBqUmBLfaIURMMqeQ%3D%21%7C%21emptyListToken%21%7C%21%21%` +
        `7C%21isListEmpty%21%7C%21false%21%7C%21listCount%21%7C%21%21%7C%21displayCalloutInLegend%2` +
        `1%7C%21false%21%7C%21addThisRequired%21%7C%21true%21%7C%21jobboardListPageTitle%21%7C%21Jo` +
        `b+Search+-+Advanced+Search%21%7C%21listContenDescriptionTT%21%7C%21%21%7C%21jobNumberSearc` +
        `h%21%7C%21%21%7C%21location1%21%7C%21%21%7C%21location2%21%7C%21%21%7C%21location3%21%7C%2` +
        `1%21%7C%21radiusLocation%21%7C%21%21%7C%21radiusLocationEmpty%21%7C%21%21%7C%21radiusContr` +
        `yName%21%7C%21%21%7C%21zip%21%7C%21%21%7C%21radiusOptions%21%7C%21%21%7C%21masterCheckboxS` +
        `ite%21%7C%21false%21%7C%21unit%21%7C%211%21%7C%21siteListId%21%7C%21%21%7C%21jobfield1%21%` +
        `7C%21%21%7C%21jobfield2%21%7C%21%21%7C%21jobfield3%21%7C%21%21%7C%21organization1%21%7C%21` +
        `%21%7C%21organization2%21%7C%21%21%7C%21organization3%21%7C%21%21%7C%21keyword%21%7C%21%21` +
        `%7C%21postedDate%21%7C%21%21%7C%21urgent%21%7C%21%21%7C%21artJobLevel%21%7C%21%21%7C%21art` +
        `JobType%21%7C%21%21%7C%21artJobSchedule%21%7C%21%21%7C%21artJobShift%21%7C%21%21%7C%21artE` +
        `mployeeStatus%21%7C%21%21%7C%21artStudyLevel%21%7C%21%21%7C%21artWillTravel%21%7C%21%21%7C` +
        `%21tabLocationPatch%21%7C%21true%21%7C%21canDisplayRSSButton%21%7C%21true%21%7C%21rssJobFi` +
        `eldIconTT%21%7C%21This+criteria+can+be+used+for+RSS+feed+creation%3A+%3F%3FJobField%3F%3F%` +
        `21%7C%21rssRadiusIconTT%21%7C%21This+criteria+can+be+used+for+RSS+feed+creation%3A+Zip%2FP` +
        `ostal+Code+Radius%21%7C%21rssLocationIconTT%21%7C%21This+criteria+can+be+used+for+RSS+feed` +
        `+creation%3A+%3F%3FLocation%3F%3F%21%7C%21canDisplayFacebookButton%21%7C%21false%21%7C%21c` +
        `anDisplaySavedSearchHelp%21%7C%21false%21%7C%21radiusActive%21%7C%21false%21%7C%21showLink` +
        `Title%21%7C%21Show+Search+Criteria%21%7C%21showLinkTitleTT%21%7C%21Show+the+search+criteri` +
        `a%21%7C%21hideLinkTitle%21%7C%21Hide+Search+Criteria%21%7C%21hideLinkTitleTT%21%7C%21Hide+` +
        `the+search+criteria%21%7C%21udf1%21%7C%21%21%7C%21udf2%21%7C%21%21%7C%21udf3%21%7C%21%21%7` +
        `C%21udf4%21%7C%21%21%7C%21udf5%21%7C%21%21%7C%21udf6%21%7C%21%21%7C%21udf7%21%7C%21%21%7C%` +
        `21udf8%21%7C%21%21%7C%21udf9%21%7C%21%21%7C%21udf10%21%7C%21%21%7C%21serializedCriteria%21` +
        `%7C%2119%3A%3A%3B%3B20%3A%3A%3B%3B21%3A%3A%3B%3B%21%7C%21mLastActiveMode%21%7C%21reqListAd` +
        `vancedPage%21%7C%21distance%21%7C%210%21%7C%21locationSiteId%21%7C%210%21%7C%21zipcode%21%` +
        `7C%21%21%2524%21advancedSearchFooterInterface%21%7C%21true%21%2524%21advancedSearchInterfa` +
        `ce%21%7C%21This+criteria+can+be+used+for+RSS+feed+creation%3A+%3F%3FJobField%3F%3F%21%7C%2` +
        `1This+criteria+can+be+used+for+RSS+feed+creation%3A+%3F%3FJobField%3F%3F%21%7C%21This+crit` +
        `eria+can+be+used+for+RSS+feed+creation%3A+%3F%3FLocation%3F%3F%21%7C%21This+criteria+can+b` +
        `e+used+for+RSS+feed+creation%3A+%3F%3FLocation%3F%3F%21%7C%21You+can+search+jobs+by+select` +
        `ing+relevant+criteria+in+the+drop-down+menus.+You+can+also+use+a+job+number+or+a+keyword.%` +
        `21%7C%21You+can+search+for+jobs+in+more+than+one+job+field%2C+location+and+organization.+A` +
        `fter+selecting+a+value+in+one+of+these+fields%2C+click+%2522Add...%2522+and+make+another+s` +
        `election.%21%7C%21To+perform+a+job+search+using+basic+search+criteria%2C+click+the+%2522Ba` +
        `sic+Search%2522+tab+and+select+the+relevant+criteria.%21%7C%21false%21%7C%21%21%2524%21req` +
        `uisitionListInterface%21%7C%21false%21%7C%21%21%7C%21Search+Results+%2819999+jobs+found%29` +
        `%21%7C%21Search+Results+%2819999+jobs+found%29%21%7C%21%21%7C%21false%21%7C%21true%21%7C%2` +
        `1false%21%7C%21No+jobs+match+the+specified+criteria.%21%7C%21%21%7C%21%21%7C%21requisition` +
        `List%21%7C%21requisitionList%21%7C%21%21%7C%21%21%7C%21%21%7C%21%21%7C%21%21%7C%21Take+a+f` +
        `ew+minutes+to+create+or+modify+your+employment+profile+and+to+specify+your+preferred+worki` +
        `ng+criteria+for+future+openings+matching+your+interests.%21%7C%21+%21%2524%21languageSelec` +
        `tInterface%21%2524%21advancedSearchHeaderInterface%21%7C%21+%21%7C%21%21*%21%253Cp+style%3` +
        `D%2522margin-top%3A+0px%3B+margin-bottom%3A+0px%3B%2522%253E%253Cspan+style%3D%2522font-fa` +
        `mily%3Aarial%2522%253E%253Cspan+style%3D%2522font-size%3A1.125em%2522%253EUse+the+%253Ca+t` +
        `itle%3D%2522%2522+style%3D%2522color%3A+rgb%2826%2C+13%2C+171%29%3B+font-size%3A+14px%3B%2` +
        `522+href%3D%2522https%3A%2F%2Fwww.careerarc.com%2Fjob-map%2Fstarbucks%2Fcampaign%2F17764%2` +
        `522%253E%253Cstrong%253E%253Cspan+style%3D%2522text-decoration%3Aunderline%2522%253Eintera` +
        `ctive+map%253C%2Fspan%253E%253C%2Fstrong%253E%253C%2Fa%253E+to+search+and+apply+for+retail` +
        `+positions+near+you.%253C%2Fspan%253E%253C%2Fspan%253E%253C%2Fp%253E%250D%250A%253Cdiv%253` +
        `E%2526nbsp%3B%253C%2Fdiv%253E%250D%250A%253Cdiv%253E%2526nbsp%3B%253C%2Fdiv%253E&displayLi` +
        `stingsPerPage=true&searchcriteria.state=false&actOpenRequisitionDescription.requisitionNo=` +
        `&actOnReqApplyReqList.requisitionNo=&mySavedSearchesPageLink.target=&nameValue=&keyword=&j` +
        `obfield1=&location1=&tzname=America%2FBogota&languageSelect=en&jobfield1L1=-1&location1L1=` +
        `-1&dropListSize=100&dropSortBy=21`;

    try {
        const response = await fetch(urlRequest, {
            method: 'POST',
            headers: {
                accept:
                    'text/html,application/xhtml+xml,application/xml;q=0.9,' +
                    'image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'cache-control': 'max-age=0',
                'content-type': 'application/x-www-form-urlencoded',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'iframe',
                'sec-fetch-mode': 'navigate',
                'sec-fetch-site': 'same-origin',
                'sec-fetch-user': '?1',
                'upgrade-insecure-requests': '1',
            },
            body: body,
        });

        const data = await response.text();
        const fullHtml = document.createElement('div');
        fullHtml.innerHTML = decodeURIComponent(data);

        let fullJobs = fullHtml.querySelector('#response').textContent.trim().split('job cart\\:');

        fullJobs.shift();

        out.pass_it.limit = fullJobs.length;

        for (let x in fullJobs) {
            if (fullJobs.length < 1) break;
            const job = {};
            const elem = fullJobs[x];

            job.title = elem.split(' - ').shift().trim();

            job.url = elem
                .split('!|!false!|!true!|!true!|!')
                .pop()
                .split('!|!')
                .shift()
                .replaceAll('\\:', '')
                .replaceAll('//', '://')
                .trim();

            job.reqid = job.url.split('job=').pop().split('&').shift().trim();

            //job.location = elem.split('!|!')[19].trim().split('-').reverse().join(', ');
            let location = elem.split('!|!')[17].trim();

            if (location.search('-') < 0) {
                let locPath = elem.split('- Store#').pop().split('!|!').shift().trim();
                job.source_location = `Store# ${locPath}`;
                job.location = locPath.split(', ').pop().trim();
            } else {
                location = location.split('-');
                location.pop();

                job.source_location = elem.split('!|!')[17].trim().split('-').reverse().join(', ');
                job.location = location.reverse().join(', ');
            }

            if (job.location.indexOf('US-NJ-Paramus-Rte 17N - Paramus') > -1) {
                job.location = 'US-NJ-Paramus-Rte 17N - Paramus';
            }

            if (job.location.search(/97th|75 Street/gi) > -1 || !job.location) {
                job.location = 'Seattle, WA';
            }

            job.source_empname = 'Starbucks';

            job.temp = 'Abr-2022';

            jobs.push(job);
        }
    } catch (error) {
        msg(error.message);
    }

    if (out.pass_it.attempts >= 3) {
        const jobGhost = { title: 'No jobs!' };
        jobs.push(jobGhost);
    }

    out.jobs = jobs;
    return out;
})();

//////////////////////////////////////////// PAGINATION

(function () {
    const out = {};
    out.pass_it = pass_it;
    out.pass_it.count++;

    if (out.pass_it.limit < 100) {
        out.has_next_page = false;
    } else {
        out.has_next_page = true;
    }

    return out;
})();

//////////////////////////////////////////// JOBDESCRIPTION

(function () {
    const out = {};
    const job = {};
    const selector = 'div[class="editablesection"]';
    const remove_selectors = [
        'a',
        'img',
        'svg',
        'video',
        'button',
        'input',
        'style',
        'javascript',
        'script',
    ];

    if (document.querySelector(selector)) {
        if (typeof cleanHTML === 'undefined') cleanHTML = x => x;
        if (typeof msg === 'undefined') msg = console.log;

        if (document.querySelector('[id="requisitionDescriptionInterface.ID1948.row1"]')) {
            job.source_jobtype = document
                .querySelector('[id="requisitionDescriptionInterface.ID1948.row1"]')
                .textContent.trim();
        }

        if (document.querySelector('[id="requisitionDescriptionInterface.reqPostingDate.row1"]')) {
            let posted = document
                .querySelector('[id="requisitionDescriptionInterface.reqPostingDate.row1"]')
                .textContent.trim();
            job.dateposted_raw = new Date(posted).toLocaleDateString();
        }

        if (
            document.querySelector('[id="requisitionDescriptionInterface.reqUnpostingDate.row1"]')
        ) {
            let closed = document
                .querySelector('[id="requisitionDescriptionInterface.reqUnpostingDate.row1"]')
                .textContent.trim();
            if (closed.search(/[0-9]/) > -1)
                job.dateclosed_raw = new Date(closed).toLocaleDateString();
        }

        const full_html = document.querySelector(selector);
        // Remove something from the jobdatata
        if (remove_selectors.length > 0) {
            remove_selectors.forEach(elem => {
                if (full_html.querySelector(elem)) {
                    let items = full_html.querySelectorAll(elem);
                    for (const selector of items) selector.remove();
                }
            });
        }
        /*
        const delete_items = document.querySelectorAll('p');
        for (const item of delete_items) {
            if (item.textContent.search(/@|www.|https:|http:|.com/g) > -1) {
                item.remove();
            }
        }
        */

        job.html = full_html.innerHTML.trim();
        job.html = cleanHTML(job.html);

        let temp = document.createElement('div');
        temp.innerHTML = job.html;

        job.jobdesc = temp.textContent.trim();
        job.jobdesc = cleanHTML(job.jobdesc);

        const clean_strings = [`${pass_it.job.title}`];

        if (clean_strings.length > 0) {
            clean_strings.forEach(elem => {
                job.html = job.html.replace(elem, '');
            });
        }

        job.html = removeTextBefore(job.html, 'Are you ready to?', true);
        job.html = removeTextBefore(job.html, 'Summary of Key Responsibilities', true);
        job.html = removeTextBefore(job.html, 'Brand', true);
        job.html = removeTextBefore(job.html, 'Job Summary and Mission', true);
        job.html = removeTextAfter(job.html, 'Job Number:', true);
    } else {
        job.html = '';
        job.jobdesc = '';
        msg('\x1b[31m ¡No se econtro el selector! ');
    }

    out.job = job;
    return out;
})();

function removeTextBefore(html, text, flag) {
    let keyWord;
    let newHtml = html;

    if (newHtml.indexOf(text) > -1) keyWord = text;
    if (newHtml.indexOf(text) > -1) newHtml = newHtml.split(text).pop();
    if (!flag) if (keyWord) newHtml = '<h3>' + keyWord + '</h3>' + newHtml;
    return newHtml;
}

function removeTextAfter(html, text, flag) {
    let newHtml = html;
    if (newHtml.indexOf(text) > -1) newHtml = newHtml.split(text).shift();
    if (!flag) newHtml = newHtml + '<p>' + text + '</p>';
    return newHtml;
}
