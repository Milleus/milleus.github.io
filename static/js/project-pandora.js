var API_KEY = 'AIzaSyBpI_JymH-mU-Xg26h90FPF36V1XlSISdY';
var API_URL = 'https://www.googleapis.com/pagespeedonline/v4/runPagespeed?';
var URL_LIST = [
  // ministries (16)
  'http://www.mci.gov.sg',
  'http://www.mccy.gov.sg',
  'http://www.mindef.gov.sg',
  'http://www.moe.gov.sg',
  'http://www.mof.gov.sg',
  'http://www.mfa.gov.sg',
  'http://www.moh.gov.sg',
  'http://www.mha.gov.sg',
  'http://www.mlaw.gov.sg',
  'http://www.mom.gov.sg',
  'http://www.mnd.gov.sg',
  'http://www.msf.gov.sg',
  'http://www.mewr.gov.sg',
  'http://www.mti.gov.sg',
  'http://www.mot.gov.sg',
  'http://www.pmo.gov.sg',
  // statutory boards (63)
  'http://www.acra.gov.sg',
  'http://www.a-star.edu.sg',
  'http://www.ava.gov.sg',
  'http://www.boa.gov.sg',
  'http://www.bca.gov.sg',
  'http://www.cra.gov.sg',
  'http://www.cpf.gov.sg',
  'http://www.caas.gov.sg',
  'http://www.cscollege.gov.sg',
  'http://www.cccs.gov.sg',
  'http://www.cea.gov.sg',
  'http://www.dsta.gov.sg',
  'http://www.sedb.com',
  'http://www.ema.gov.sg',
  'http://www.tech.gov.sg',
  'http://www.hpb.gov.sg',
  'http://www.hsa.gov.sg',
  'http://www.hlb.gov.sg',
  'http://www.hdb.gov.sg',
  'http://www.imda.gov.sg',
  'http://www.iras.gov.sg',
  'http://www.ite.edu.sg',
  'http://www.ipos.gov.sg',
  'http://www.iesingapore.gov.sg',
  'http://www.iseas.edu.sg',
  'http://www.jtc.gov.sg',
  'http://www.lta.gov.sg',
  'http://www.muis.gov.sg',
  'http://www.mpa.gov.sg',
  'http://www.mas.gov.sg',
  'http://www.nyp.edu.sg',
  'http://www.nac.gov.sg',
  'http://www.ncss.gov.sg',
  'http://www.nea.gov.sg',
  'http://www.nhb.gov.sg',
  'http://www.nlb.gov.sg',
  'http://www.nparks.gov.sg',
  'http://www.np.edu.sg',
  'http://www.pa.gov.sg',
  'http://www.peb.gov.sg',
  'http://www.pub.gov.sg',
  'http://www.ptc.gov.sg',
  'http://www.rp.edu.sg',
  'http://www.science.edu.sg',
  'http://www.sentosa.com.sg',
  'http://www.sac.gov.sg',
  'http://www.score.gov.sg',
  'http://www.sdc.gov.sg',
  'http://www.seab.gov.sg',
  'http://www.sla.gov.sg',
  'http://www.smc.gov.sg',
  'http://www.snb.gov.sg',
  'http://www.spc.gov.sg',
  'http://www.sp.edu.sg',
  'http://www.stb.gov.sg',
  'http://www.skillsfuture.sg',
  'http://www.sportsingapore.gov.sg',
  'http://www.spring.gov.sg',
  'http://www.tcmpb.gov.sg',
  'http://www.tp.edu.sg',
  'http://www.toteboard.gov.sg',
  'http://www.ura.gov.sg',
  'http://www.wsg.gov.sg',
  // organs of state (10)
  'http://www.agc.gov.sg',
  'http://www.ago.gov.sg',
  'http://www.iac.gov.sg',
  'http://www.istana.gov.sg',
  'http://www.familyjusticecourts.gov.sg',
  'http://www.statecourts.gov.sg',
  'http://www.supremecourt.gov.sg',
  'http://www.parliament.gov.sg',
  'http://www.psc.gov.sg',
  'http://www.cabinet.gov.sg'
];

var callbacks = {};
var impactArr = [];
var idx = 0;

// Invokes the PageSpeed Insights API. The response will contain
// JavaScript that invokes our callback with the PageSpeed results.
function runPagespeed() {
  generateScript();
}

function generateScript() {
  if (idx < URL_LIST.length) {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    var query = [
      'url=' + URL_LIST[idx],
      'callback=runPagespeedCallbacks',
      'key=' + API_KEY,
    ].join('&');

    s.src = API_URL + query;
    document.head.insertBefore(s, null);

    console.log('Request:', URL_LIST[idx], ', Timestamp:', new Date());
    idx++;
    setTimeout(generateScript, 2000);
  }
}

function runPagespeedCallbacks(result) {
  if (result.error) {
    var errors = result.error.errors;
    for (var i = 0, len = errors.length; i < len; ++i) {
      if (errors[i].reason == 'badRequest' && API_KEY == 'yourAPIKey') {
        alert('Please specify your Google API key in the API_KEY variable.');
      } else {
        console.log(errors[i].message);
      }
    }
    return;
  }

  console.log('Adding Site:', result.id);

  for (var fn in callbacks) {
    var f = callbacks[fn];
    if (typeof f == 'function') {
      callbacks[fn](result);
    }
  }
}

// Invoke the callback that fetches results. Async here so we're sure
// to discover any callbacks registered below, but this can be
// synchronous in your code.
setTimeout(runPagespeed, 0);

callbacks.displayLoadingExperience = function (result) {
  var appendString = `<td>${getSiteInfo(result)}</td>`;
  appendString += `<td>${getLoadingExperience(result)}</td>`;
  appendString += `<td>${getOptimizationScore(result)}</td>`;
  appendString += `<td>${getRecommendations(result)}</td>`;

  var tr = document.createElement('tr');
  tr.innerHTML = appendString;
  var tbody = document.querySelector('tbody');
  tbody.appendChild(tr);

  impactArr.sort(sortByImpact);
  setStats('#rule-by-impact');
  impactArr.sort(sortByAffected);
  setStats('#rule-by-affected');
}

function getSiteInfo(result) {
  var siteUrl = result.id;
  var siteTitle = result.title;
  return `${siteUrl}<br>${siteTitle}`
}

function getLoadingExperience(result) {
  var speedScore = result.loadingExperience.overall_category;
  var metrics = result.loadingExperience.metrics;
  var medianDcl = metrics && metrics.DOM_CONTENT_LOADED_EVENT_FIRED_MS ? metrics.DOM_CONTENT_LOADED_EVENT_FIRED_MS.median : 'NA';
  var medianFcp = metrics && metrics.FIRST_CONTENTFUL_PAINT_MS ? metrics.FIRST_CONTENTFUL_PAINT_MS.median : 'NA';
  return `Overall: ${speedScore}<br>FCP: ${medianFcp}<br>DCL: ${medianDcl}`;
}

function getOptimizationScore(result) {
  var optimizationScore = result.ruleGroups.SPEED.score;
  return optimizationScore;
}

function getRecommendations(result) {
  var siteUrl = result.id;
  var recommendations = [];
  var ruleResults = result.formattedResults.ruleResults;
  for (var i in ruleResults) {
    if (ruleResults[i].ruleImpact == 0) {
      continue;
    }

    var name = ruleResults[i].localizedRuleName;
    var impact = ruleResults[i].ruleImpact;
    tabulateImpact(ruleResults[i]);

    recommendations.push({
      name: ruleResults[i].localizedRuleName,
      impact: ruleResults[i].ruleImpact
    });
  };
  recommendations.sort(sortByImpact);

  var recommendationString = '';
  for (var i in recommendations) {
    recommendationString += `${recommendations[i].name} (${recommendations[i].impact})<br>`;
  }
  return recommendationString;
}

function tabulateImpact(rule) {
  var isKeyFound = false;
  for (i in impactArr) {
    var obj = impactArr[i];
    if (obj.localizedRuleName == rule.localizedRuleName) {
      obj.impact += rule.ruleImpact;
      obj.affected += 1;
      isKeyFound = true;
    }
  }

  if (isKeyFound) {
    return;
  }

  impactArr.push({
    localizedRuleName: rule.localizedRuleName,
    impact: rule.ruleImpact,
    affected: 0
  });
}

function setStats(selector) {
  var selected = document.querySelector(selector);
  var appendString = '';

  for (var i = 0; i < 3; i++) {
    appendString += `<li>${impactArr[i].localizedRuleName} (${impactArr[i].impact})<br>No. of Affected: ${impactArr[i].affected}</li>`;
  }

  selected.innerHTML = appendString;
}

// Helper function that sorts results in order of impact.
function sortByImpact(a, b) {
  return b.impact - a.impact;
}

function sortByAffected(a, b) {
  return b.affected - a.affected;
}