# VAST XML Ad Tag Examples 
A collection of VAST (Video Ad Serving Template) XML examples for testing video ad tags. Includes sample VAST 2.0, 3.0, and 4.0 tags for ad servers, players, and QA workflows. Useful for developers, testers, and ad ops teams validating VAST ad serving and playback 

This repository provides example **[VAST (Video Ad Serving Template)](https://iabtechlab.com/standards/vast/)** XML ad tags that can be used for testing video advertising integrations, ad servers, and VAST players.  

These sample tags are useful for:  
- Beginners learning about **VAST XML structure and elements**
- Developers testing **video ad integrations**  
- Publishers verifying **ad server setups**  
- QA engineers running **pre-roll and mid-roll ad tests**  
- AdOps teams validating **third-party VAST XML tags** 


## How to Use These Tags

### For testing:
You can paste the hosted XML links into a VAST tag tester like [AdMeIn VAST Tester](https://admein.io/vast-tester) or directly into your video player setup for debugging.

## Endpoint URLs
Example hosted VAST XML files can be accessed via the following URLs:

**VAST 3.0**   
 [VAST simple linear learn more button](https://admein-advertising.github.io/vast-tag-xml-examples/vast-3.0/linear-learn-more-button-vast-3-0-sample.xml)  
 [VAST simple interactive linear VPAID](https://admein-advertising.github.io/vast-tag-xml-examples/vast-3.0/linear-vpaid-vast-3-0-sample.xml)   


**VAST 4.0**   
 Added `<AdVerifications>` for MRC/OMID measurement.   
 [VAST OMID Verification](https://admein-advertising.github.io/vast-tag-xml-examples/vast-4.0/OMID-ad-verifications-vast-4-0-sample.xml)  


**VAST 4.1**   
 Added `<UniversalAdId>` requirement + better error tracking.   
 [Universal Ad ID](https://admein-advertising.github.io/vast-tag-xml-examples/vast-4.1/universal-ad-Id-vast-4-1-sample.xml)  

**VAST 4.2**     
Added `<ConditionalAd>` + improvements in `<Mezzanine>` and streaming support.   
 [VAST Conditional Ad + Mezzanine](https://admein-advertising.github.io/vast-tag-xml-examples/vast-4.2/mezzanine-vast-4-2-sample.xml)

## Why VAST Tags Matter

The VAST standard, maintained by the IAB, ensures consistent communication between ad servers and video players. By using sample VAST XML tags, you can:

- Test ad playback compatibility across different players
- Validate tracking events (impressions, quartiles, clicks)
- Ensure ad delivery reliability before running campaigns   

## AdMeIn Help Center

For more information on using VAST tags and troubleshooting ad playback issues, please visit the [AdMeIn Help Center](https://admein.io/help).

### Disclaimer
___These examples are for educational and testing purposes only. AdMeIn is not a real ad server, it is a testing tool used for testing video ads. Please ensure compliance with all relevant advertising standards and guidelines when using VAST tags in production.___

## Contributing

We welcome contributions to this repository! If you have suggestions for new VAST XML examples or improvements to existing ones, please open an issue or submit a pull request.
