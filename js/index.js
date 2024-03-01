$(document).ready(function(){
    const animateText = (show) => {
        setInterval(()=>{
            if(show){
                $('.word1').fadeOut(500);
                $('.word2').fadeOut(1000);
                show = false;
            }else{
                $('.word1').slideDown(500);
                $('.word2').slideDown(1000);
                show = true;
            }
        }, 10000);
    }
    animateText(true);

    $('.patientCampaign').click(() => {
        document.location.href = "view-details";
    });

    $('.patientCampaignInner').click(() => {
        document.location.href = "../view-details";
    });

    $('.ssDetails').click(() => {
        document.location.href = "view-story";
    });

    const fetchPatientsHome = () => {
        let fetchPatientsHome = 'fph';
        $.post("classes/controller.php", { fetchPatientsHome }, function(data){
            // console.log(data);
            let returnObj = JSON.parse(data);
            // console.log(returnObj);
            var homePatientData = '';
            returnObj.map(async (patient) => {
                const response = await fetch('assets/patient_stories/'+patient.detail);
                const text = await response.text();
                // console.log(patient.img_sm, text);
                homePatientData += '<div class="col-md-4 col-sm-12 col-xs-12 d-flex justify-content-center">'+
                    '<div class="shadow d-flex flex-column justify-content-start align-items-center m-3 w-100" style="width: 261px; border-radius: 10px;">'+
                        '<img src="assets/images/'+ patient.img_sm +'" style="border-top-left-radius: 10px; border-top-right-radius: 10px;" class="w-100">'+
                        '<div class="px-2" style="font-weight: bold;">'+ patient.subject +'</div>'+
                        '<div class="px-2" style="font-size: 12px">'+ text.substr(0, 70) +'... <a href="view-details?id='+patient.id+'">[Read More]</a></div>'+
                        '<div class="p-2 w-100">'+
                            '<div class="progress">'+
                            '<div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" style="width: '+parseInt((patient.raised/patient.required)*100)+'%;" aria-valuenow="'+parseInt((patient.raised/patient.required)*100)+'" aria-valuemin="0" aria-valuemax="100">'+parseInt((patient.raised/patient.required)*100)+'%</div>'+
                            '</div>'+
                        '</div>'+
                        '<div class="d-flex flex-row justify-content-between align-items-center w-100 p-2" style="border-bottom: 1px solid #ccc;">'+
                            '<div>'+
                                '<span>&#36;'+ patient.required +'</span><br/>'+
                                '<span class="text-success">Required</span>'+
                            '</div>'+
                            '<div>'+
                                '<span>&#36;'+ patient.raised +'</span><br/>'+
                                '<span class="text-success">Raised</span>'+
                            '</div>'+
                        '</div>'+
                        '<button class="btn btn-success m-2 w-75 openPatientModalHome" patientId="'+patient.id+'" data-bs-toggle="modal" data-bs-target="#exampleModal">Donate Now</button>'+
                    '</div>'+
                '</div>'
                $(".hpl").html(homePatientData);
            });
        });
    }
    fetchPatientsHome();

    $(document).on("click", ".openPatientModalHome", function() {
        let patientId = $(this).attr("patientId");
        $('.pId').val(patientId);
    });

    const fetchNewsHome = () => {
        let fetchNewsHome = 'fnh';
        $.post("classes/controller.php", { fetchNewsHome }, function(data){
            // console.log(data);
            let returnObj = JSON.parse(data);
            // console.log(returnObj);
            var homeNewsData = '';
            returnObj.map((news) => {
                homeNewsData += '<div class="d-flex flex-row justify-content-center align-items-center col-xs-12 col-sm-12 col-md-3">'+
                                    '<div class="shadow m-1" style="width: 261px; border-radius: 10px;">'+
                                        '<a href="'+news.link+'" target="_blank"><img src="assets/images/'+news.image+'" style="border-top-left-radius: 10px; border-top-right-radius: 10px;"></a>'+
                                        '<a href="'+news.link+'" style="text-decoration: none;" target="_blank"><div class="p-2 text-success" style="font-weight: bold;">'+news.topic+'</div></a>'+
                                    '</div>'+
                                '</div>'
            });
            $(".newsList").html(homeNewsData);
        });
    }
    fetchNewsHome();

    const fetchVideosHome = () => {
        let fetchVideosHome = 'fvh';
        $.post("classes/controller.php", { fetchVideosHome }, function(data){
            // console.log(data);
            let returnObj = JSON.parse(data);
            // console.log(returnObj);
            var homeVideoData = '';
            returnObj.map((video) => {
                homeVideoData += '<div class="d-flex flex-row justify-content-center align-items-center col-xs-12 col-sm-12 col-md-3">'+
                                    '<div class="shadow m-1" style="width: 261px; border-radius: 10px;">'+
                                        '<iframe width="100%" height="250" src="https://www.youtube.com/embed/'+video.v_link+'?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'+
                                        '<div class="p-2" style="font-weight: bold;">'+video.topic+'</div>'+
                                    '</div>'+
                                '</div>'
            });
            $(".videoList").html(homeVideoData);
        });
    }
    fetchVideosHome();

    const fetchNews = () => {
        let fetchNews = 'fn';
        $.post("../classes/controller.php", { fetchNews }, function(data){
            // console.log(data);
            let returnObj = JSON.parse(data);
            // console.log(returnObj);
            var newsData = '';
            returnObj.map((news) => {
                newsData += '<div class="d-flex flex-row justify-content-center align-items-center col-xs-12 col-sm-12 col-md-3">'+
                                    '<div class="shadow m-1" style="width: 261px; border-radius: 10px;">'+
                                        '<a href="'+news.link+'" target="_blank"><img src="../assets/images/'+news.image+'" style="border-top-left-radius: 10px; border-top-right-radius: 10px;"></a>'+
                                        '<a href="'+news.link+'" style="text-decoration: none;" target="_blank"><div class="p-2 text-success" style="font-weight: bold;">'+news.topic+'</div></a>'+
                                    '</div>'+
                                '</div>'
            });
            $(".newsListInner").html(newsData);
        });
    }
    fetchNews();

    const fetchVideos = () => {
        let fetchVideos = 'fv';
        $.post("../classes/controller.php", { fetchVideos }, function(data){
            // console.log(data);
            let returnObj = JSON.parse(data);
            // console.log(returnObj);
            var videoData = '';
            returnObj.map((video) => {
                videoData += '<div class="d-flex flex-row justify-content-center align-items-center col-xs-12 col-sm-12 col-md-3">'+
                                    '<div class="shadow m-1" style="width: 261px; border-radius: 10px;">'+
                                        '<iframe width="100%" height="250" src="https://www.youtube.com/embed/'+video.v_link+'?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'+
                                        '<div class="p-2" style="font-weight: bold;">'+video.topic+'</div>'+
                                    '</div>'+
                                '</div>'
            });
            $(".videoListInner").html(videoData);
        });
    }
    fetchVideos();

    const fetchPatients = () => {
        let fetchPatients = 'fp';
        $.post("../classes/controller.php", { fetchPatients }, function(data){
            // console.log(data);
            let returnObj = JSON.parse(data);
            // console.log(returnObj);
            var patientData = '';
            returnObj.map(async (patient) => {
                const response = await fetch('../assets/patient_stories/'+patient.detail);
                const text = await response.text();
                patientData += '<div class="shadow d-flex flex-column justify-content-start align-items-center m-1" style="width: 261px; border-radius: 10px;">'+
                    '<img src="../assets/images/'+ patient.img_sm +'" style="border-top-left-radius: 10px; border-top-right-radius: 10px;">'+
                    '<div class="p-2" style="font-weight: bold;">'+ patient.subject +'</div>'+
                    '<div class="p-2" style="font-size: 12px;">'+ text.substr(0, 70) +'... <a href="../view-details?id='+patient.id+'">[Read More]</a></div>'+
                    '<div class="p-2 w-100">'+
                        '<div class="progress">'+
                        '<div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" style="width: '+parseInt((patient.raised/patient.required)*100)+'%;" aria-valuenow="'+parseInt((patient.raised/patient.required)*100)+'" aria-valuemin="0" aria-valuemax="100">'+parseInt((patient.raised/patient.required)*100)+'%</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="d-flex flex-row justify-content-between align-items-center w-100 p-2" style="border-bottom: 1px solid #ccc;">'+
                        '<div>'+
                            '<span>&#36;'+patient.required+'</span><br/>'+
                            '<span class="text-success">Required</span>'+
                        '</div>'+
                        '<div>'+
                            '<span>&#36;'+patient.raised+'</span><br/>'+
                            '<span class="text-success">Raised</span>'+
                        '</div>'+
                    '</div>'+
                    '<button class="btn btn-success m-2 w-75 openPatientModalHome" patientId="'+patient.id+'" data-bs-toggle="modal" data-bs-target="#exampleModal">Donate Now</button>'+
                '</div>'

                $(".pl").html(patientData);
            });
        });
    }
    fetchPatients();

    const fetchHomeEduCampsApp = () => {
        let fetchEduCampsApp = 'feca';
        $.post("classes/controller.php", { fetchEduCampsApp }, function(data){
            // console.log(data);
            let returnObj = JSON.parse(data);
            // console.log(returnObj);
            var hCampData = '';
            returnObj.map(async (patient) => {
                const response = await fetch('assets/patient_stories/'+patient.detail);
                const text = await response.text();
                hCampData += '<div class="shadow d-flex flex-column justify-content-start align-items-center m-1" style="width: 261px; border-radius: 10px;">'+
                    '<img src="assets/images/'+ patient.img_sm +'" style="border-top-left-radius: 10px; border-top-right-radius: 10px;">'+
                    '<div class="p-2" style="font-weight: bold;">'+ patient.subject +'</div>'+
                    '<div class="p-2" style="font-size: 12px;">'+ text.substr(0, 70) +'... <a href="view-edu-camp?id='+patient.id+'">[Read More]</a></div>'+
                    '<div class="p-2 w-100">'+
                        '<div class="progress">'+
                        '<div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" style="width: '+parseInt((patient.raised/patient.required)*100)+'%;" aria-valuenow="'+parseInt((patient.raised/patient.required)*100)+'" aria-valuemin="0" aria-valuemax="100">'+parseInt((patient.raised/patient.required)*100)+'%</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="d-flex flex-row justify-content-between align-items-center w-100 p-2" style="border-bottom: 1px solid #ccc;">'+
                        '<div>'+
                            '<span>&#36;'+patient.required+'</span><br/>'+
                            '<span class="text-success">Required</span>'+
                        '</div>'+
                        '<div>'+
                            '<span>&#36;'+patient.raised+'</span><br/>'+
                            '<span class="text-success">Raised</span>'+
                        '</div>'+
                    '</div>'+
                    '<button class="btn btn-success m-2 w-75 openPatientModalHome" patientId="'+patient.id+'" data-bs-toggle="modal" data-bs-target="#exampleModal">Donate Now</button>'+
                '</div>'

                $(".hepl").html(hCampData);
            });
        });
    }
    fetchHomeEduCampsApp();

    const fetchEduCampsApp = () => {
        let fetchEduCampsApp = 'feca';
        $.post("../classes/controller.php", { fetchEduCampsApp }, function(data){
            // console.log(data);
            let returnObj = JSON.parse(data);
            // console.log(returnObj);
            var campData = '';
            returnObj.map(async (patient) => {
                const response = await fetch('../assets/patient_stories/'+patient.detail);
                const text = await response.text();
                campData += '<div class="shadow d-flex flex-column justify-content-start align-items-center m-1" style="width: 261px; border-radius: 10px;">'+
                    '<img src="../assets/images/'+ patient.img_sm +'" style="border-top-left-radius: 10px; border-top-right-radius: 10px;">'+
                    '<div class="p-2" style="font-weight: bold;">'+ patient.subject +'</div>'+
                    '<div class="p-2" style="font-size: 12px;">'+ text.substr(0, 70) +'... <a href="../view-edu-camp?id='+patient.id+'">[Read More]</a></div>'+
                    '<div class="p-2 w-100">'+
                        '<div class="progress">'+
                        '<div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" style="width: '+parseInt((patient.raised/patient.required)*100)+'%;" aria-valuenow="'+parseInt((patient.raised/patient.required)*100)+'" aria-valuemin="0" aria-valuemax="100">'+parseInt((patient.raised/patient.required)*100)+'%</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="d-flex flex-row justify-content-between align-items-center w-100 p-2" style="border-bottom: 1px solid #ccc;">'+
                        '<div>'+
                            '<span>&#36;'+patient.required+'</span><br/>'+
                            '<span class="text-success">Required</span>'+
                        '</div>'+
                        '<div>'+
                            '<span>&#36;'+patient.raised+'</span><br/>'+
                            '<span class="text-success">Raised</span>'+
                        '</div>'+
                    '</div>'+
                    '<button class="btn btn-success m-2 w-75 openPatientModalHome" patientId="'+patient.id+'" data-bs-toggle="modal" data-bs-target="#exampleModal">Donate Now</button>'+
                '</div>'

                $(".epl").html(campData);
            });
        });
    }
    fetchEduCampsApp();

    const fetchEduCampDetails = () => {
        let fetchCampDetails = 'fcd';
        let campId = $('.campId').text();
        $.post("../classes/controller.php", { fetchCampDetails, campId }, function(data){
            // console.log(data);
            let returnObj = JSON.parse(data);
            // console.log(returnObj);
            
            var supporters = '';
            returnObj[1].map((sup, i) => {
                if(i < 5){
                    supporters += '<div class="col-sm-12 col-xs-12 col-md-3">'+
                                '<div class="d-flex flex-column align-items-center">'+
                                    '<i class="fas fa-grin-hearts text-success" style="font-size: 100px;"></i>'+
                                    '<h6 style="font-weight: bold;">'+sup.name+'</h6>'+
                                    '<h6 class="text-success">Donated: &#36;'+sup.amount+'</h6>'+
                                '</div>'+
                            '</div>'
                }
            });

            var campDetail = '';
            returnObj[0].map(async (detail) => {
                const response = await fetch('../assets/patient_stories/'+detail.detail);
                const text = await response.text();
                let url = "Hi, %0a %0aI'd really appreciate it if you would share or donate to this link. %0a %0a*"+detail.subject+"* %0a %0a"+text.substring(0, 150)+"... %0a %0aRead more here%0a https://giftingvolunteernetwork.org/view-edu-camp?id="+detail.id+" %0a %0aForward this message to your contacts to help this campaign reach it's goal!";
                campDetail += '<img src="../assets/images/'+detail.img_bg+'" style="border-radius: 20px;" class="w-100">'+
                '<h5 style="font-weight: bold; margin-top: 10px;">'+detail.subject+'</h5>'+
                '<div class="d-flex flex-column bg-light p-3 mt-2" style="border-radius: 20px;">'+
                    '<div class="progress w-100">'+
                        '<div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" style="width: '+parseInt((detail.raised/detail.required)*100)+'%;" aria-valuenow="'+parseInt((detail.raised/detail.required)*100)+'" aria-valuemin="0" aria-valuemax="100">'+parseInt((detail.raised/detail.required)*100)+'%</div>'+
                    '</div>'+
                    '<div class="d-flex flex-row justify-content-between align-items-center w-100">'+
                        '<div>'+
                            '<span>&#36;'+detail.required+'</span><br/>'+
                            '<span class="text-success">Required</span>'+
                        '</div>'+
                        '<div>'+
                            '<span>&#36;'+detail.raised+'</span><br/>'+
                            '<span class="text-success">Raised</span>'+
                        '</div>'+
                        '<div>'+
                            '<span>&#36;'+(detail.required - detail.raised)+'</span><br/>'+
                            '<span class="text-success">Remaining</span>'+
                        '</div>'+
                    '</div>'+
                    '<div class="d-flex flex-row justify-content-between align-items-center w-100 mt-3">'+
                        '<div>'+
                            '<i class="fab fa-gratipay text-success"></i> <span class="text-muted" style="font-weight: bold;">'+returnObj[1].length+' Supporters</span>'+
                        '</div>'+
                        '<div>'+
                            '<button class="btn btn-success openPatientModalHome" patientId="'+detail.id+'" data-bs-toggle="modal" data-bs-target="#exampleModal">Donate now</button>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                    
                '<div class="tabis ubuntu-font">'+
                    '<div class="tabi-2">'+
                        '<label for="tabi2-1">Story</label>'+
                        '<input id="tabi2-1" name="tabis-two" type="radio" checked="checked">'+
                        '<div>'+
                            '<p>'+text+'</p>'+
                        '</div>'+
                    '</div>'+
                    
                    '<div class="tabi-2">'+
                        '<label for="tabi2-2">Supporters</label>'+
                        '<input id="tabi2-2" name="tabis-two" type="radio">'+
                        '<div class="ubuntu-font">'+
                            '<div class="row">'+supporters+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div>'+
                    '<h6 style="font-weight: bold;">Tell your friends and make an impact</h6>'+
                    '<div class="d-flex flex-row">'+
                        '<a target="_blank" href="https://twitter.com/intent/tweet?url='+url+'" class="btn btn-info btn-sm m-1 text-white"><i class="fab fa-twitter"></i> Twitter</a>'+
                        '<a href="whatsapp://send?text='+url+'" target="_blank" data-action="share/whatsapp/share" class="btn btn-success btn-sm m-1"><i class="fab fa-whatsapp"></i> Whatsapp</a>'+
                        '<a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u='+url+'&amp;src=sdkpreparse" class="btn btn-primary btn-sm m-1"><i class="fab fa-facebook"></i> Facebook</a>'+
                    '</div>'+
                '</div>'

                $(".campDetails").html(campDetail);
            });
        });
    }
    fetchEduCampDetails();

    const fetchStories = () => {
        let fetchStories = 'fs';
        $.post("../classes/controller.php", { fetchStories }, function(data){
            // console.log(data);
            let returnObj = JSON.parse(data);
            // console.log(returnObj);
            var stories = '';
            returnObj.map((story) => {
                stories += '<div class="shadow d-flex flex-column justify-content-start align-items-center m-1" style="width: 261px; border-radius: 10px;">'+
                    '<a style="text-decoration: none;" href="../view-story?id='+story.id+'"><img src="../assets/images/'+story.img_sm+'" style="border-top-left-radius: 10px; border-top-right-radius: 10px;"></a>'+
                    '<div class="p-2" style="font-weight: bold;"><a style="text-decoration: none;" class="text-dark" href="../view-story?id='+story.id+'">'+story.subject+'</a></div>'+
                    '<a style="text-decoration: none;" class="text-success" href="../view-story?id='+story.id+'">Read more</a>'+
                    '<div class="p-2 w-100">'+
                        '<div class="progress">'+
                            '<div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" style="width: '+story.percentage+'%;" aria-valuenow="'+story.percentage+'" aria-valuemin="0" aria-valuemax="100">'+story.percentage+'%</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="d-flex flex-row justify-content-between align-items-center w-100 p-2" style="border-bottom: 1px solid #ccc;">'+
                        '<div>'+
                            '<span>&#36;'+story.required+'</span><br/>'+
                            '<span class="text-success">Required</span>'+
                        '</div>'+
                        '<div>'+
                            '<span>&#36;'+story.raised+'</span><br/>'+
                            '<span class="text-success">Raised</span>'+
                        '</div>'+
                    '</div>'+
                    '<button class="btn btn-success m-2 w-75">Completed</button>'+
                '</div>'
            });
            $(".ps").html(stories);
        });
    }
    fetchStories();

    const fetchStory = () => {
        let fetchStory = 'fs';
        let storyId = $('.storyId').text();
        $.post("../classes/controller.php", { fetchStory, storyId }, function(data){
            // console.log(data);
            let returnObj = JSON.parse(data);
            // console.log(returnObj);
            var patientStory = '';
            returnObj.map(async (story) => {
                const response = await fetch('../assets/success_stories/'+story.detail);
                const text = await response.text();
                let url = "Hi, %0a %0aI'd really appreciate it if you would share this success story link. %0a %0a*"+story.subject+"* %0a %0a"+text.substring(0, 150)+"... %0a %0aRead more here%0a https://giftingvolunteernetwork.org/view-story?id="+story.id+" %0a %0aForward this message to your contacts to help this campaign reach it's goal!";
                patientStory += '<img src="../assets/images/'+story.img_bg+'" style="border-radius: 20px;" class="w-100">'+
                '<h5 style="font-weight: bold; margin-top: 10px;">'+story.subject+'</h5>'+
                '<div class="d-flex flex-column bg-light p-3 mt-2" style="border-radius: 20px;">'+
                    '<div class="progress w-100">'+
                        '<div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" style="width: '+story.percentage+'%;" aria-valuenow="'+story.percentage+'" aria-valuemin="0" aria-valuemax="100">'+story.percentage+'%</div>'+
                    '</div>'+
                    '<div class="d-flex flex-row justify-content-between align-items-center w-100">'+
                        '<div>'+
                            '<span>&#36;'+story.required+'</span><br/>'+
                            '<span class="text-success">Required</span>'+
                        '</div>'+
                        '<div>'+
                            '<span>&#36;'+story.raised+'</span><br/>'+
                            '<span class="text-success">Raised</span>'+
                        '</div>'+
                        '<div>'+
                            '<span>&#36;'+(story.required - story.raised)+'</span><br/>'+
                            '<span class="text-success">Remaining</span>'+
                        '</div>'+
                    '</div>'+
                    '<div class="d-flex flex-row justify-content-between align-items-center w-100 mt-3">'+
                        '<div>'+
                            '<i class="fab fa-gratipay text-success"></i> <span class="text-muted" style="font-weight: bold;">70 Supporters</span>'+
                        '</div>'+
                        '<div>'+
                            '<button class="btn btn-success">Completed</button>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                    
                '<div class="tabis ubuntu-font">'+
                    '<div class="tabi-2">'+
                        '<label for="tabi2-1">Success Story</label>'+
                        '<input id="tabi2-1" name="tabis-two" type="radio" checked="checked">'+
                        '<div>'+
                            '<h4>'+story.name+'\'s Story</h4>'+
                            '<p>'+text+'</p>'+
                            '<p>'+
                                '<iframe width="100%" height="315" src="https://www.youtube.com/embed/'+story.v_link+'?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'+
                            '</p>'+
                        '</div>'+
                    '</div>'+
                    
                    '<div class="tabi-2">'+
                        '<label for="tabi2-2">Supporters</label>'+
                        '<input id="tabi2-2" name="tabis-two" type="radio">'+
                        '<div class="ubuntu-font">'+
                            '<div class="row">'+
                                
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div>'+
                    '<h6 style="font-weight: bold;">Tell your friends and make an impact</h6>'+
                    '<div class="d-flex flex-row">'+
                    '<a target="_blank" href="https://twitter.com/intent/tweet?url='+url+'" class="btn btn-info btn-sm m-1 text-white"><i class="fab fa-twitter"></i> Twitter</a>'+
                    '<a href="whatsapp://send?text='+url+'" target="_blank" data-action="share/whatsapp/share" class="btn btn-success btn-sm m-1"><i class="fab fa-whatsapp"></i> Whatsapp</a>'+
                    '<a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u='+url+'&amp;src=sdkpreparse" class="btn btn-primary btn-sm m-1"><i class="fab fa-facebook"></i> Facebook</a>'+
                    '</div>'+
                '</div>'

                $(".storyDetails").html(patientStory);
            });
        });
    }
    fetchStory();

    const fetchPatient = () => {
        let fetchPatient = 'fp';
        let patientId = $('.patientId').text();
        $.post("../classes/controller.php", { fetchPatient, patientId }, function(data){
            // console.log(data);
            let returnObj = JSON.parse(data);
            // console.log(returnObj);
            
            var supporters = '';
            returnObj[1].map((sup, i) => {
                if(i < 5){
                    supporters += '<div class="col-sm-12 col-xs-12 col-md-3">'+
                                '<div class="d-flex flex-column align-items-center">'+
                                    '<i class="fas fa-grin-hearts text-success" style="font-size: 100px;"></i>'+
                                    '<h6 style="font-weight: bold;">'+sup.name+'</h6>'+
                                    '<h6 class="text-success">Donated: &#36;'+sup.amount+'</h6>'+
                                '</div>'+
                            '</div>'
                }
            });

            var patientDetail = '';
            returnObj[0].map(async (detail) => {
                const response = await fetch('../assets/patient_stories/'+detail.detail);
                const text = await response.text();
                let url = "Hi, %0a %0aI'd really appreciate it if you would share or donate to this link. %0a %0a*"+detail.subject+"* %0a %0a"+text.substring(0, 150)+"... %0a %0aRead more here%0a https://giftingvolunteernetwork.org/view-details?id="+detail.id+" %0a %0aForward this message to your contacts to help this campaign reach it's goal!";
                patientDetail += '<img src="../assets/images/'+detail.img_bg+'" style="border-radius: 20px;" class="w-100">'+
                '<h5 style="font-weight: bold; margin-top: 10px;">'+detail.subject+'</h5>'+
                '<div class="d-flex flex-column bg-light p-3 mt-2" style="border-radius: 20px;">'+
                    '<div class="progress w-100">'+
                        '<div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" style="width: '+parseInt((detail.raised/detail.required)*100)+'%;" aria-valuenow="'+parseInt((detail.raised/detail.required)*100)+'" aria-valuemin="0" aria-valuemax="100">'+parseInt((detail.raised/detail.required)*100)+'%</div>'+
                    '</div>'+
                    '<div class="d-flex flex-row justify-content-between align-items-center w-100">'+
                        '<div>'+
                            '<span>&#36;'+detail.required+'</span><br/>'+
                            '<span class="text-success">Required</span>'+
                        '</div>'+
                        '<div>'+
                            '<span>&#36;'+detail.raised+'</span><br/>'+
                            '<span class="text-success">Raised</span>'+
                        '</div>'+
                        '<div>'+
                            '<span>&#36;'+(detail.required - detail.raised)+'</span><br/>'+
                            '<span class="text-success">Remaining</span>'+
                        '</div>'+
                    '</div>'+
                    '<div class="d-flex flex-row justify-content-between align-items-center w-100 mt-3">'+
                        '<div>'+
                            '<i class="fab fa-gratipay text-success"></i> <span class="text-muted" style="font-weight: bold;">'+returnObj[1].length+' Supporters</span>'+
                        '</div>'+
                        '<div>'+
                            '<button class="btn btn-success openPatientModalHome" patientId="'+detail.id+'" data-bs-toggle="modal" data-bs-target="#exampleModal">Donate now</button>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                    
                '<div class="tabis ubuntu-font">'+
                    '<div class="tabi-2">'+
                        '<label for="tabi2-1">Story</label>'+
                        '<input id="tabi2-1" name="tabis-two" type="radio" checked="checked">'+
                        '<div>'+
                            '<h4>'+detail.name+'\'s Story</h4>'+
                            '<p>'+text+'</p>'+
                            '<p>'+
                                '<iframe width="100%" height="315" src="https://www.youtube.com/embed/'+detail.v_link+'?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'+
                            '</p>'+
                        '</div>'+
                    '</div>'+
                    
                    '<div class="tabi-2">'+
                        '<label for="tabi2-2">Supporters</label>'+
                        '<input id="tabi2-2" name="tabis-two" type="radio">'+
                        '<div class="ubuntu-font">'+
                            '<div class="row">'+supporters+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div>'+
                    '<h6 style="font-weight: bold;">Tell your friends and make an impact</h6>'+
                    '<div class="d-flex flex-row">'+
                        '<a target="_blank" href="https://twitter.com/intent/tweet?url='+url+'" class="btn btn-info btn-sm m-1 text-white"><i class="fab fa-twitter"></i> Twitter</a>'+
                        '<a href="whatsapp://send?text='+url+'" target="_blank" data-action="share/whatsapp/share" class="btn btn-success btn-sm m-1"><i class="fab fa-whatsapp"></i> Whatsapp</a>'+
                        '<a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u='+url+'&amp;src=sdkpreparse" class="btn btn-primary btn-sm m-1"><i class="fab fa-facebook"></i> Facebook</a>'+
                    '</div>'+
                '</div>'

                $(".patientDetails").html(patientDetail);
            });
        });
    }
    fetchPatient();

    // const fetchStatsHome = () => {
    //     let fetchStats = 'fs';
    //     $.post("classes/controller.php", { fetchStats }, function(data){
    //         console.log(data);
    //         let returnObj = JSON.parse(data);
    //         console.log(returnObj);
            
    //         $('.patientsTreated').text(returnObj[0].patientsTreated);
    //         $('.fundsSpent').text('$'+returnObj[0].fundsSpent==null ? 0 : returnObj[0].fundsSpent);
    //         $('.donors').text(returnObj[0].supporters);
    //     });
    // }
    // fetchStatsHome();

    // const fetchStats = () => {
    //     let fetchStats = 'fs';
    //     $.post("../classes/controller.php", { fetchStats }, function(data){
    //         console.log(data);
    //         let returnObj = JSON.parse(data);
    //         console.log(returnObj);
            
    //         $('.patientsTreated').text(returnObj[0].patientsTreated);
    //         $('.fundsSpent').text('$'+returnObj[0].fundsSpent==null ? 0 : returnObj[0].fundsSpent);
    //         $('.donors').text(returnObj[0].supporters);
    //     });
    // }
    // fetchStats();

    function makePaymentHome(patientId, fname, lname, email, amount, ref) {
        console.log(patientId + fname + lname + email);
        var paidPatient2 = patientId;
        var supporterName2 = fname=='' && lname=='' ? 'Anonymous Anonymous' : fname+' '+lname;

        var handler = PaystackPop.setup({
            key: 'pk_live_6b70b9e8ad99037d6a24b2ff8a07b7561537ba7f', // Replace with your public key
            email,
            amount: amount * 100, // the amount value is multiplied by 100 to convert to the lowest currency unit
            currency: 'USD', // Use GHS for Ghana Cedis or USD for US Dollars
            ref, // Replace with a reference you generated
            callback: function(response) {
                $.post("classes/controller.php", { makePaymentHome: 'mph', status: response.status, amount, currency: 'USD', fRef: response.reference, tId: response.trans, txRef: response.trxref, supporterName2, email, paidPatient2 }, function(data){
                    console.log(data);
                });
                
            },
            onClose: function() {
              alert('Transaction was not completed, window closed.');
            },
        });
        handler.openIframe();

        // FlutterwaveCheckout({
        //   //public_key: "FLWPUBK_TEST-1f54ec57ae43e1393f16beb582c606c1-X",
        //   public_key: "FLWPUBK-bc0e7f1f726769b6fc451b041b9039fd-X",
        //   tx_ref: ref,
        //   amount: amount,
        //   currency: "USD",
        //   country: "US",
        //   payment_options: " ",
        //   customer: {
        //     email: email,
        //     phone_number: patientId,
            // name: fname=='' && lname=='' ? 'Anonymous Anonymous' : fname+' '+lname,
        //   },
        //   callback: function (data) { // specified callback function
        //     // console.log(data);
        //     let pId = data.customer.phone_number;
        //     let status = data.status;
        //     let amount = data.amount;
        //     let currency = data.currency;
        //     let fRef = data.flw_ref;
        //     let tId = data.transaction_id;
        //     let txRef = data.tx_ref;
        //     let name = data.customer.name;
        //     let email = data.customer.email;
        //     let makePaymentHome = 'mph';
            
        //     // console.log("Inside payment callback", paidPatient2 + supporterName2 + email);

        //     $.post("classes/controller.php", { makePaymentHome, status, amount, currency, fRef, tId, txRef, supporterName2, email, paidPatient2 }, function(data){
        //         // console.log(data);
        //     });
        //   },
        //   customizations: {
        //     title: "Gifting Volunteer Network Donation",
        //     description: "Donation to the less privilege",
        //     logo: "https://giftingvolunteernetwork.org/assets/logos/logo.png",
        //   },
        // });
    }

    function makePaymentInner(patientId, fname, lname, email, amount, ref) {
        console.log(patientId + fname + lname + email);
        var paidPatient = patientId;
        var supporterName = fname=='' && lname=='' ? 'Anonymous Anonymous' : fname+' '+lname;

        var handler = PaystackPop.setup({
            key: 'pk_live_6b70b9e8ad99037d6a24b2ff8a07b7561537ba7f', // Replace with your public key
            email,
            amount: amount * 100, // the amount value is multiplied by 100 to convert to the lowest currency unit
            currency: 'USD', // Use GHS for Ghana Cedis or USD for US Dollars
            ref, // Replace with a reference you generated
            callback: function(response) {
                $.post("../classes/controller.php", { makePaymentInner: 'mph', status: response.status, amount, currency: 'USD', fRef: response.reference, tId: response.trans, txRef: response.trxref, supporterName, email, paidPatient }, function(data){
                    console.log(data);
                });
            },
            onClose: function() {
              alert('Transaction was not completed, window closed.');
            },
        });
        handler.openIframe();

        // console.log(patientId + fname + lname + email);
        // var paidPatient = patientId;
        // var supporterName = fname=='' && lname=='' ? 'Anonymous Anonymous' : fname+' '+lname;
        // FlutterwaveCheckout({
        //   //public_key: "FLWPUBK_TEST-1f54ec57ae43e1393f16beb582c606c1-X",
        //   public_key: "FLWPUBK-bc0e7f1f726769b6fc451b041b9039fd-X",
        //   tx_ref: ref,
        //   amount: amount,
        //   currency: "USD",
        //   country: "US",
        //   payment_options: " ",
        //   customer: {
        //     email: email,
        //     phone_number: patientId,
        //     name: fname=='' && lname=='' ? 'Anonymous Anonymous' : fname+' '+lname,
        //   },
        //   callback: function (data) { // specified callback function
        //     // console.log(data);
        //     let pId = data.customer.phone_number;
        //     let status = data.status;
        //     let amount = data.amount;
        //     let currency = data.currency;
        //     let fRef = data.flw_ref;
        //     let tId = data.transaction_id;
        //     let txRef = data.tx_ref;
        //     let name = data.customer.name;
        //     let email = data.customer.email;
        //     let makePaymentInner = 'mph';
            
        //     // console.log("Inside payment callback", paidPatient + supporterName + email);

        //     $.post("../classes/controller.php", { makePaymentInner, status, amount, currency, fRef, tId, txRef, supporterName, email, paidPatient }, function(data){
        //         // console.log(data);
        //     });
        //   },
        //   customizations: {
        //     title: "Gifting Volunteer Network Donation",
        //     description: "Donation to the less privilege",
        //     logo: "https://giftingvolunteernetwork.org/assets/logos/logo.png",
        //   },
        // });
    }

    // $(".donateAmount").keyup(function(){
    //     let amount = $(".amount").val();
    //     let charge = (15/100) * amount;

    //     $(".charges").val(Math.round(charge * 100)  / 100);
    // });

    $('.freePayment').click(() => {
        let pId = $('.pId').val();
        let fname = $('.fname').val();
        let lname = $('.lname').val();
        let email = $('.email').val();
        //let phone = $('.phone').val();
        let amount = Number($('.amount').val());
        // amount += Number($('.charges').val());

        //alert(amount);
        let ref = 'Rx_'+Math.floor(Math.random() * 1000000000);

        if(email=='' || amount==''){
            alert('Input all missing field');
        }else{
            makePaymentHome(pId, fname, lname, email, amount, ref);
        }
    });

    $('.freePaymentInner').click(() => {
        let pId = $('.pId').val();
        let fname = $('.fname').val();
        let lname = $('.lname').val();
        let email = $('.email').val();
        //let phone = $('.phone').val();
        let amount = Number($('.amount').val());
        // amount += Number($('.charges').val());

        let ref = 'Rx_'+Math.floor(Math.random() * 1000000000);

        if(email=='' || amount==''){
            alert('Input all missing field');
        }else{
            makePaymentInner(pId, fname, lname, email, amount, ref);
        }
    });

    function setModal(params){
        params.headerSelector === null ? null : params.headerSelector.html(params.headerContent);
        params.bodySelector === null ? null : params.bodySelector.html(params.bodyContent);
        params.footerSelector === null ? null : params.footerSelector.html(params.footerContent);
        params.modalSelector.modal(params.modalState === "show" ? "show" : "hide");
    }

    function gotoLocation(location){
        window.location.href = location;
    }

    $('#adminLoginButton').click(function(){
        let email = $('#adminEmail').val();
        let password = $('#adminPassword').val();
        let adminLogin = "al";
        // console.log(email+' - '+password);

        $.post("../classes/controller.php", { adminLogin, email, password }, function(data){
           //alert(data);
            if(data === "1"){
               setModal({
                    headerSelector: $("#modalHeader"), 
                    headerContent: "<i class='fas fa-check-circle text-success'></i> Success",
                    bodySelector: $("#modalBody"),
                    bodyContent:  "Login Successful!",
                    footerSelector: null,
                    footerContent: null,
                    modalSelector: $("#regModal"),
                    modalState: "show"
                });
                setTimeout(function(){
                    gotoLocation("dashboard.php");
                }, 2000);
            }else{
                setModal({
                    headerSelector: $("#modalHeader"), 
                    headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                    bodySelector: $("#modalBody"),
                    bodyContent:  "Incorrect login credentials",
                    footerSelector: null,
                    footerContent: null,
                    modalSelector: $("#regModal"),
                    modalState: "show"
                }); 
            }
        });
    });

    $("#logoutButtonAdmin").click(function(){
        let logout = "lg";
        $.post("../classes/controller.php", { logout }, function(data){
           if(data === "Logout Successfully"){
            setModal({
                headerSelector: $("#modalHeader"), 
                headerContent: "<i class='fas fa-check-circle text-success'></i> Success",
                bodySelector: $("#modalBody"),
                bodyContent:  data,
                footerSelector: null,
                footerContent: null,
                modalSelector: $("#regModal"),
                modalState: "show"
            });
            setTimeout(function(){
                gotoLocation("index.html");
            }, 2000);
           }
        });
    });

    function fetchDashboard(){
        let fetchDashboard = "fd";
        $.post("../classes/controller.php", { fetchDashboard }, function(data){
            //alert(data);
            let returnObj = JSON.parse(data);

            $("#tfr").html("$"+returnObj.tfr);
            $("#hc").html(returnObj.hc);
            $("#ss").html(returnObj.ss);
            $("#s").html(returnObj.s);
        });
    }
    fetchDashboard();

    $('#registerAdminButton').click(function(e){
        let firstname = $("#firstname").val();
        let lastname = $("#lastname").val();
        let email = $("#emailAddress").val();
        let password = $("#password").val();
        let rPassword = $("#rPassword").val();
        let registerAdmin = "registerAdmin";

        //alert(email + password + rPassword);
        if(firstname === ""){
            setModal({
                headerSelector: $("#modalHeader"), 
                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                bodySelector: $("#modalBody"),
                bodyContent:  "First name field is required",
                footerSelector: null,
                footerContent: null,
                modalSelector: $("#regModal"),
                modalState: "show"
            });
        }else if(lastname === ""){
            setModal({
                headerSelector: $("#modalHeader"), 
                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                bodySelector: $("#modalBody"),
                bodyContent:  "Last name field is required",
                footerSelector: null,
                footerContent: null,
                modalSelector: $("#regModal"),
                modalState: "show"
            });
        }else if(email === ""){
            setModal({
                headerSelector: $("#modalHeader"), 
                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                bodySelector: $("#modalBody"),
                bodyContent:  "Email field is required",
                footerSelector: null,
                footerContent: null,
                modalSelector: $("#regModal"),
                modalState: "show"
            });
        }else if(password === ""){
            setModal({
                headerSelector: $("#modalHeader"), 
                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                bodySelector: $("#modalBody"),
                bodyContent:  "Password field is required",
                footerSelector: null,
                footerContent: null,
                modalSelector: $("#regModal"),
                modalState: "show"
            });
        }else if(rPassword === ""){
            setModal({
                headerSelector: $("#modalHeader"), 
                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                bodySelector: $("#modalBody"),
                bodyContent:  "Repeat password field is required",
                footerSelector: null,
                footerContent: null,
                modalSelector: $("#regModal"),
                modalState: "show"
            });
        }else if(password !== rPassword){
            setModal({
                headerSelector: $("#modalHeader"), 
                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                bodySelector: $("#modalBody"),
                bodyContent:  "Password not match",
                footerSelector: null,
                footerContent: null,
                modalSelector: $("#regModal"),
                modalState: "show"
            });
        }else{
            $("#registerAdminButton").hide('slow');
            $("#loaderButton").show('slow');
            e.preventDefault();
            $.post("../classes/controller.php", { registerAdmin, firstname, lastname, email, password, rPassword }, function(data){
                //alert(data);
                if(data === "Registration Successful"){
                   setModal({
                        headerSelector: $("#modalHeader"), 
                        headerContent: "<i class='fas fa-check-circle text-success'></i> Success",
                        bodySelector: $("#modalBody"),
                        bodyContent:  "Registration Successful!",
                        footerSelector: null,
                        footerContent: null,
                        modalSelector: $("#regModal"),
                        modalState: "show"
                    });
                    setTimeout(function(){
                        gotoLocation("../admin/create-admin.php");
                    }, 4000);

                    $("#registerAdminButton").show('slow');
                    $("#loaderButton").hide('slow');
                }else{
                    setModal({
                        headerSelector: $("#modalHeader"), 
                        headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                        bodySelector: $("#modalBody"),
                        bodyContent:  "Registration failed for some unknown reasons, try again!",
                        footerSelector: null,
                        footerContent: null,
                        modalSelector: $("#regModal"),
                        modalState: "show"
                    }); 

                    $("#registerAdminButton").show('slow');
                    $("#loaderButton").hide('slow');
                }
            });
        }
    });

    function fetchAdmins(){
        let fetchAdmins = "fa";
        $.post("../classes/controller.php", { fetchAdmins }, function(data){
            //alert(data);
            let adminArray = JSON.parse(data);

            var options = {
                dataSource: adminArray,
                callback: function (response, pagination) {
                    //window.console && console.log(response, pagination);
            
                    var dataHtml = '<tr>';

                    $.each(response, function (index, item) {
                        dataHtml +='<tr>'+
                              '<td>'+item.firstname+'</td>'+
                              '<td>'+item.lastname+'</td>'+
                              '<td>'+item.email+'</td>'+
                              '<td>'+item.dc+'</td>'+
                            '</tr>';
                    });

                    dataHtml += '</tr>';

                    // console.log(dataHtml);
                    
                    $("#adminList").prev().html(dataHtml);
                }
            };

            // $("#pagination-demo1").pagination(options);
        });
    }
    fetchAdmins();

    $('#uploadSmallImage').on('click', function(e) {
        let file_data = $('#smallImage').prop('files')[0];   
        let form_data = new FormData();                  
        form_data.append('file', file_data);
        // console.log(file_data.name);  
        e.preventDefault();                           
        $.ajax({
            xhr: function() {
                var xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener("progress", function(evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = ((evt.loaded / evt.total) * 100);
                        // $(".progressSmallImage").show();
                        $(".progressSmallImage").html(
                            '<div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" style="width: '+percentComplete+'%" aria-valuenow="'+percentComplete+'" aria-valuemin="0" aria-valuemax="100">'+percentComplete+'%</div>'
                        );
                    }
                }, false);
                return xhr;
            },
            url: '../classes/controller.php', // <-- point to server-side PHP script 
            dataType: 'text',  // <-- what to expect back from the PHP script, if anything
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,                         
            type: 'post',
            beforeSend: function(){
                $(".progressSmallImage").show();
            },
            error:function(resp){
                // console.log('Error', resp);
                $('#uploadStatus').html('<p style="color:#EA4335;">File upload failed, please try again.</p>');
                $(".progressSmallImage").hide();
            },
            success: function(resp){
                // console.log('Success', resp);
                if(resp == 'ok'){
                    //$('#uploadForm')[0].reset();
                    $('#uploadStatus').html('<p style="color:#28A74B;">File has uploaded successfully!</p>');
                    $("#previewSm").html('<img src="../assets/images/'+file_data.name+'" style="max-width: 261px; max-height: auto;">')
                }else{
                    $('#uploadStatus').html('<p style="color:#EA4335;">Please select a valid file to upload.</p>');
                    $(".progressSmallImage").hide();
                }
            }
        });
    });

    $('#usi').on('click', function(e) {
        let file_data = $('#si').prop('files')[0];   
        let form_data = new FormData();                  
        form_data.append('file', file_data);
        // console.log(file_data.name);  
        e.preventDefault();                           
        $.ajax({
            xhr: function() {
                var xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener("progress", function(evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = ((evt.loaded / evt.total) * 100);
                        // $(".progressSmallImage").show();
                        $(".psi").html(
                            '<div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" style="width: '+percentComplete+'%" aria-valuenow="'+percentComplete+'" aria-valuemin="0" aria-valuemax="100">'+percentComplete+'%</div>'
                        );
                    }
                }, false);
                return xhr;
            },
            url: '../classes/controller.php', // <-- point to server-side PHP script 
            dataType: 'text',  // <-- what to expect back from the PHP script, if anything
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,                         
            type: 'post',
            beforeSend: function(){
                $(".psi").show();
            },
            error:function(resp){
                // console.log('Error', resp);
                $('#us').html('<p style="color:#EA4335;">File upload failed, please try again.</p>');
                $(".psi").hide();
            },
            success: function(resp){
                // console.log('Success', resp);
                if(resp == 'ok'){
                    //$('#uploadForm')[0].reset();
                    $('#us').html('<p style="color:#28A74B;">File has uploaded successfully!</p>');
                    $("#psm").html('<img src="../assets/images/'+file_data.name+'" style="max-width: 261px; max-height: auto;">')
                }else{
                    $('#us').html('<p style="color:#EA4335;">Please select a valid file to upload.</p>');
                    $(".psi").hide();
                }
            }
        });
    });

    $('#uploadLargeImage').on('click', function(e) {
        let file_data = $('#largeImage').prop('files')[0];   
        let form_data = new FormData();                  
        form_data.append('file', file_data);
        // console.log(file_data.name);  
        e.preventDefault();                           
        $.ajax({
            xhr: function() {
                var xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener("progress", function(evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = ((evt.loaded / evt.total) * 100);
                        // $(".progressSmallImage").show();
                        $(".progressLargeImage").html(
                            '<div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" style="width: '+percentComplete+'%" aria-valuenow="'+percentComplete+'" aria-valuemin="0" aria-valuemax="100">'+percentComplete+'%</div>'
                        );
                    }
                }, false);
                return xhr;
            },
            url: '../classes/controller.php', // <-- point to server-side PHP script 
            dataType: 'text',  // <-- what to expect back from the PHP script, if anything
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,                         
            type: 'post',
            beforeSend: function(){
                $(".progressLargeImage").show();
            },
            error:function(resp){
                // console.log('Error', resp);
                $('#uploadStatusLg').html('<p style="color:#EA4335;">File upload failed, please try again.</p>');
                $(".progressLargeImage").hide();
            },
            success: function(resp){
                // console.log('Success', resp);
                if(resp == 'ok'){
                    //$('#uploadForm')[0].reset();
                    $('#uploadStatusLg').html('<p style="color:#28A74B;">File has uploaded successfully!</p>');
                    $("#previewLg").html('<img src="../assets/images/'+file_data.name+'" style="max-width: 261px; max-height: auto;">')
                }else{
                    $('#uploadStatusLg').html('<p style="color:#EA4335;">Please select a valid file to upload.</p>');
                    $(".progressLargeImage").hide();
                }
            }
        });
    });

    $('#uli').on('click', function(e) {
        let file_data = $('#li').prop('files')[0];   
        let form_data = new FormData();                  
        form_data.append('file', file_data);
        // console.log(file_data.name);  
        e.preventDefault();                           
        $.ajax({
            xhr: function() {
                var xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener("progress", function(evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = ((evt.loaded / evt.total) * 100);
                        // $(".progressSmallImage").show();
                        $(".pli").html(
                            '<div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" style="width: '+percentComplete+'%" aria-valuenow="'+percentComplete+'" aria-valuemin="0" aria-valuemax="100">'+percentComplete+'%</div>'
                        );
                    }
                }, false);
                return xhr;
            },
            url: '../classes/controller.php', // <-- point to server-side PHP script 
            dataType: 'text',  // <-- what to expect back from the PHP script, if anything
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,                         
            type: 'post',
            beforeSend: function(){
                $(".pli").show();
            },
            error:function(resp){
                // console.log('Error', resp);
                $('#uslg').html('<p style="color:#EA4335;">File upload failed, please try again.</p>');
                $(".pli").hide();
            },
            success: function(resp){
                // console.log('Success', resp);
                if(resp == 'ok'){
                    //$('#uploadForm')[0].reset();
                    $('#uslg').html('<p style="color:#28A74B;">File has uploaded successfully!</p>');
                    $("#plg").html('<img src="../assets/images/'+file_data.name+'" style="max-width: 261px; max-height: auto;">')
                }else{
                    $('#uslg').html('<p style="color:#EA4335;">Please select a valid file to upload.</p>');
                    $(".pli").hide();
                }
            }
        });
    });

    $('#uploadStoryFile').on('click', function(e) {
        let file_data = $('#storyFile').prop('files')[0];   
        let form_data = new FormData();                  
        form_data.append('file', file_data);
        // console.log(file_data.name);  
        e.preventDefault();                           
        $.ajax({
            xhr: function() {
                var xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener("progress", function(evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = ((evt.loaded / evt.total) * 100);
                        // $(".progressSmallImage").show();
                        $(".progressStoryFile").html(
                            '<div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" style="width: '+percentComplete+'%" aria-valuenow="'+percentComplete+'" aria-valuemin="0" aria-valuemax="100">'+percentComplete+'%</div>'
                        );
                    }
                }, false);
                return xhr;
            },
            url: '../classes/uploadTxtPatient.php', // <-- point to server-side PHP script 
            dataType: 'text',  // <-- what to expect back from the PHP script, if anything
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,                         
            type: 'post',
            beforeSend: function(){
                $(".progressStoryFile").show();
            },
            error:function(resp){
                // console.log('Error', resp);
                $('#uploadStatusStory').html('<p style="color:#EA4335;">File upload failed, please try again.</p>');
                $(".progressStoryFile").hide();
            },
            success: function(resp){
                // console.log('Success', resp);
                if(resp == 'ok'){
                    //$('#uploadForm')[0].reset();
                    $('#uploadStatusStory').html('<p style="color:#28A74B;">File has uploaded successfully!</p>');
                    $("#previewStory").html('<img src="../assets/images/txt-file.png" style="max-width: 261px; max-height: auto;">')
                }else if(resp == 'err'){
                    $('#uploadStatusStory').html('<p style="color:#EA4335;">Please select a valid file to upload.</p>');
                    $(".progressStoryFile").hide();
                }
            }
        });
    });

    $('#usf').on('click', function(e) {
        let file_data = $('#sf').prop('files')[0];   
        let form_data = new FormData();                  
        form_data.append('file', file_data);
        // console.log(file_data.name);  
        e.preventDefault();                           
        $.ajax({
            xhr: function() {
                var xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener("progress", function(evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = ((evt.loaded / evt.total) * 100);
                        // $(".progressSmallImage").show();
                        $(".psf").html(
                            '<div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" style="width: '+percentComplete+'%" aria-valuenow="'+percentComplete+'" aria-valuemin="0" aria-valuemax="100">'+percentComplete+'%</div>'
                        );
                    }
                }, false);
                return xhr;
            },
            url: '../classes/uploadTxtSuccess.php', // <-- point to server-side PHP script 
            dataType: 'text',  // <-- what to expect back from the PHP script, if anything
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,                         
            type: 'post',
            beforeSend: function(){
                $(".psf").show();
            },
            error:function(resp){
                // console.log('Error', resp);
                $('#uss').html('<p style="color:#EA4335;">File upload failed, please try again.</p>');
                $(".psf").hide();
            },
            success: function(resp){
                // console.log('Success', resp);
                if(resp == 'ok'){
                    //$('#uploadForm')[0].reset();
                    $('#uss').html('<p style="color:#28A74B;">File has uploaded successfully!</p>');
                    $("#ps").html('<img src="../assets/images/txt-file.png" style="max-width: 261px; max-height: auto;">')
                }else if(resp == 'err'){
                    $('#uss').html('<p style="color:#EA4335;">Please select a valid file to upload.</p>');
                    $(".psf").hide();
                }
            }
        });
    });

    $("#storyFile").change(function(){
        let allowedTypes = ['text/plain'];
        let file = this.files[0];
        let fileType = file.type;
        // console.log(file.name + ' - ' + file.type);
        if(!allowedTypes.includes(fileType)){
            setModal({
                headerSelector: $("#modalHeader"), 
                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                bodySelector: $("#modalBody"),
                bodyContent:  "Please select a valid file (TXT).'",
                footerSelector: null,
                footerContent: null,
                modalSelector: $("#regModal"),
                modalState: "show"
            });
            $("#storyFile").val('');
            return false;
        }
    });

    $("#sf").change(function(){
        let allowedTypes = ['text/plain'];
        let file = this.files[0];
        let fileType = file.type;
        // console.log(file.name + ' - ' + file.type);
        if(!allowedTypes.includes(fileType)){
            setModal({
                headerSelector: $("#modalHeader"), 
                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                bodySelector: $("#modalBody"),
                bodyContent:  "Please select a valid file (TXT).'",
                footerSelector: null,
                footerContent: null,
                modalSelector: $("#regModal"),
                modalState: "show"
            });
            $("#sf").val('');
            return false;
        }
    });

    $("#largeImage").change(function(){
        let allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        let file = this.files[0];
        let fileType = file.type;
        // console.log(file.name + ' - ' + file.type);
        if(!allowedTypes.includes(fileType)){
            setModal({
                headerSelector: $("#modalHeader"), 
                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                bodySelector: $("#modalBody"),
                bodyContent:  "Please select a valid file (JPEG, JPG, PNG).'",
                footerSelector: null,
                footerContent: null,
                modalSelector: $("#regModal"),
                modalState: "show"
            });
            $("#largeImage").val('');
            return false;
        }
    });

    $("#li").change(function(){
        let allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        let file = this.files[0];
        let fileType = file.type;
        // console.log(file.name + ' - ' + file.type);
        if(!allowedTypes.includes(fileType)){
            setModal({
                headerSelector: $("#modalHeader"), 
                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                bodySelector: $("#modalBody"),
                bodyContent:  "Please select a valid file (JPEG, JPG, PNG).'",
                footerSelector: null,
                footerContent: null,
                modalSelector: $("#regModal"),
                modalState: "show"
            });
            $("#li").val('');
            return false;
        }
    });

    $("#smallImage").change(function(){
        let allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        let file = this.files[0];
        let fileType = file.type;
        // console.log(file.name + ' - ' + file.type);
        if(!allowedTypes.includes(fileType)){
            setModal({
                headerSelector: $("#modalHeader"), 
                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                bodySelector: $("#modalBody"),
                bodyContent:  "Please select a valid file (JPEG, JPG, PNG).'",
                footerSelector: null,
                footerContent: null,
                modalSelector: $("#regModal"),
                modalState: "show"
            });
            $("#smallImage").val('');
            return false;
        }
    });

    $("#si").change(function(){
        let allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        let file = this.files[0];
        let fileType = file.type;
        // console.log(file.name + ' - ' + file.type);
        if(!allowedTypes.includes(fileType)){
            setModal({
                headerSelector: $("#modalHeader"), 
                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                bodySelector: $("#modalBody"),
                bodyContent:  "Please select a valid file (JPEG, JPG, PNG).'",
                footerSelector: null,
                footerContent: null,
                modalSelector: $("#regModal"),
                modalState: "show"
            });
            $("#si").val('');
            return false;
        }
    });

    $('#createCampButton').click(function(e){
        let patientName = $("#patientName").val();
        let subject = $("#subject").val();
        let amountRequired = $("#amountRequired").val();
        let smallImage = ($('#smallImage').prop('files')[0]).name;
        let largeImage = ($('#largeImage').prop('files')[0]).name;
        let storyFile = ($('#storyFile').prop('files')[0]).name;
        let createCamp = "cc";

        // console.log(patientName+' - '+subject+' - '+amountRequired+' - '+smallImage+' - '+largeImage+' - '+storyFile);
        
        if(patientName === ""){
            setModal({
                headerSelector: $("#modalHeader"), 
                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                bodySelector: $("#modalBody"),
                bodyContent:  "Patient name field is required",
                footerSelector: null,
                footerContent: null,
                modalSelector: $("#regModal"),
                modalState: "show"
            });
        }else if(subject === ""){
            setModal({
                headerSelector: $("#modalHeader"), 
                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                bodySelector: $("#modalBody"),
                bodyContent:  "Subject field is required",
                footerSelector: null,
                footerContent: null,
                modalSelector: $("#regModal"),
                modalState: "show"
            });
        }else if(amountRequired === ""){
            setModal({
                headerSelector: $("#modalHeader"), 
                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                bodySelector: $("#modalBody"),
                bodyContent:  "Required amount field is required",
                footerSelector: null,
                footerContent: null,
                modalSelector: $("#regModal"),
                modalState: "show"
            });
        }else if(smallImage === ""){
            setModal({
                headerSelector: $("#modalHeader"), 
                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                bodySelector: $("#modalBody"),
                bodyContent:  "Small image is required",
                footerSelector: null,
                footerContent: null,
                modalSelector: $("#regModal"),
                modalState: "show"
            });
        }else if(largeImage === ""){
            setModal({
                headerSelector: $("#modalHeader"), 
                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                bodySelector: $("#modalBody"),
                bodyContent:  "Large image is required",
                footerSelector: null,
                footerContent: null,
                modalSelector: $("#regModal"),
                modalState: "show"
            });
        }else if(storyFile === ""){
            setModal({
                headerSelector: $("#modalHeader"), 
                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                bodySelector: $("#modalBody"),
                bodyContent:  "Patient story is required",
                footerSelector: null,
                footerContent: null,
                modalSelector: $("#regModal"),
                modalState: "show"
            });
        }else{
            $("#createCampButton").hide('slow');
            $("#loaderButton").show('slow');

            e.preventDefault();
            $.post("../classes/controller.php", { createCamp, patientName, subject, amountRequired, smallImage, largeImage, storyFile }, function(data){
                //alert(data);
                if(data === "Successfully Created"){
                   setModal({
                        headerSelector: $("#modalHeader"), 
                        headerContent: "<i class='fas fa-check-circle text-success'></i> Success",
                        bodySelector: $("#modalBody"),
                        bodyContent:  "Campaign Created Successfully!",
                        footerSelector: null,
                        footerContent: null,
                        modalSelector: $("#regModal"),
                        modalState: "show"
                    });
                    setTimeout(function(){
                        gotoLocation("../admin/create-camp.php");
                    }, 4000);

                    $("#createCampButton").show('slow');
                    $("#loaderButton").hide('slow');
                }else{
                    setModal({
                        headerSelector: $("#modalHeader"), 
                        headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                        bodySelector: $("#modalBody"),
                        bodyContent:  "Campaign creation failed for some unknown reasons, make sure you have no duplicate campaign and try again!",
                        footerSelector: null,
                        footerContent: null,
                        modalSelector: $("#regModal"),
                        modalState: "show"
                    }); 

                    $("#createCampButton").show('slow');
                    $("#loaderButton").hide('slow');
                }
            });
        }
    });

    $('#createEduCampButton').click(function(e){
        let subject = $("#subject").val();
        let amountRequired = $("#amountRequired").val();
        let smallImage = ($('#smallImage').prop('files')[0]).name;
        let largeImage = ($('#largeImage').prop('files')[0]).name;
        let storyFile = ($('#storyFile').prop('files')[0]).name;
        let createEduCamp = "cec";

        // console.log(subject+' - '+amountRequired+' - '+smallImage+' - '+largeImage+' - '+storyFile);
        
        if(subject === ""){
            setModal({
                headerSelector: $("#modalHeader"), 
                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                bodySelector: $("#modalBody"),
                bodyContent:  "Subject field is required",
                footerSelector: null,
                footerContent: null,
                modalSelector: $("#regModal"),
                modalState: "show"
            });
        }else if(amountRequired === ""){
            setModal({
                headerSelector: $("#modalHeader"), 
                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                bodySelector: $("#modalBody"),
                bodyContent:  "Required amount field is required",
                footerSelector: null,
                footerContent: null,
                modalSelector: $("#regModal"),
                modalState: "show"
            });
        }else if(smallImage === ""){
            setModal({
                headerSelector: $("#modalHeader"), 
                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                bodySelector: $("#modalBody"),
                bodyContent:  "Small image is required",
                footerSelector: null,
                footerContent: null,
                modalSelector: $("#regModal"),
                modalState: "show"
            });
        }else if(largeImage === ""){
            setModal({
                headerSelector: $("#modalHeader"), 
                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                bodySelector: $("#modalBody"),
                bodyContent:  "Large image is required",
                footerSelector: null,
                footerContent: null,
                modalSelector: $("#regModal"),
                modalState: "show"
            });
        }else if(storyFile === ""){
            setModal({
                headerSelector: $("#modalHeader"), 
                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                bodySelector: $("#modalBody"),
                bodyContent:  "Patient story is required",
                footerSelector: null,
                footerContent: null,
                modalSelector: $("#regModal"),
                modalState: "show"
            });
        }else{
            $("#createEduCampButton").hide('slow');
            $("#loaderButton").show('slow');

            e.preventDefault();
            $.post("../classes/controller.php", { createEduCamp, subject, amountRequired, smallImage, largeImage, storyFile }, function(data){
                //alert(data);
                if(data === "Successfully Created"){
                   setModal({
                        headerSelector: $("#modalHeader"), 
                        headerContent: "<i class='fas fa-check-circle text-success'></i> Success",
                        bodySelector: $("#modalBody"),
                        bodyContent:  "Campaign Created Successfully!",
                        footerSelector: null,
                        footerContent: null,
                        modalSelector: $("#regModal"),
                        modalState: "show"
                    });
                    setTimeout(function(){
                        gotoLocation("../admin/create-camp.php");
                    }, 4000);

                    $("#createEduCampButton").show('slow');
                    $("#loaderButton").hide('slow');
                }else{
                    setModal({
                        headerSelector: $("#modalHeader"), 
                        headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                        bodySelector: $("#modalBody"),
                        bodyContent:  "Campaign creation failed for some unknown reasons, make sure you have no duplicate campaign and try again!",
                        footerSelector: null,
                        footerContent: null,
                        modalSelector: $("#regModal"),
                        modalState: "show"
                    }); 

                    $("#createEduCampButton").show('slow');
                    $("#loaderButton").hide('slow');
                }
            });
        }
    });

    $('#createStoryButton').click(function(e){
        let patientName = $("#patientName").val();
        let subject = $("#subject").val();
        let amountRequired = $("#amountRequired").val();
        let v_link = $("#v_link").val();
        let smallImage = ($('#si').prop('files')[0]).name;
        let largeImage = ($('#li').prop('files')[0]).name;
        let storyFile = ($('#sf').prop('files')[0]).name;
        let createStory = "cs";

        // console.log(patientName+' - '+subject+' - '+amountRequired+' - '+v_link+' - '+smallImage+' - '+largeImage+' - '+storyFile);
        
        if(patientName === ""){
            setModal({
                headerSelector: $("#modalHeader"), 
                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                bodySelector: $("#modalBody"),
                bodyContent:  "Patient name field is required",
                footerSelector: null,
                footerContent: null,
                modalSelector: $("#regModal"),
                modalState: "show"
            });
        }else if(subject === ""){
            setModal({
                headerSelector: $("#modalHeader"), 
                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                bodySelector: $("#modalBody"),
                bodyContent:  "Subject field is required",
                footerSelector: null,
                footerContent: null,
                modalSelector: $("#regModal"),
                modalState: "show"
            });
        }else if(amountRequired === ""){
            setModal({
                headerSelector: $("#modalHeader"), 
                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                bodySelector: $("#modalBody"),
                bodyContent:  "Required amount field is required",
                footerSelector: null,
                footerContent: null,
                modalSelector: $("#regModal"),
                modalState: "show"
            });
        }else if(smallImage === ""){
            setModal({
                headerSelector: $("#modalHeader"), 
                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                bodySelector: $("#modalBody"),
                bodyContent:  "Small image is required",
                footerSelector: null,
                footerContent: null,
                modalSelector: $("#regModal"),
                modalState: "show"
            });
        }else if(largeImage === ""){
            setModal({
                headerSelector: $("#modalHeader"), 
                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                bodySelector: $("#modalBody"),
                bodyContent:  "Large image is required",
                footerSelector: null,
                footerContent: null,
                modalSelector: $("#regModal"),
                modalState: "show"
            });
        }else if(storyFile === ""){
            setModal({
                headerSelector: $("#modalHeader"), 
                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                bodySelector: $("#modalBody"),
                bodyContent:  "Patient story is required",
                footerSelector: null,
                footerContent: null,
                modalSelector: $("#regModal"),
                modalState: "show"
            });
        }else{
            $("#createStoryButton").hide('slow');
            $("#loaderButton").show('slow');

            e.preventDefault();
            $.post("../classes/controller.php", { createStory, patientName, subject, amountRequired, v_link, smallImage, largeImage, storyFile }, function(data){
                //alert(data);
                if(data === "Successfully Created"){
                   setModal({
                        headerSelector: $("#modalHeader"), 
                        headerContent: "<i class='fas fa-check-circle text-success'></i> Success",
                        bodySelector: $("#modalBody"),
                        bodyContent:  "Campaign Created Successfully!",
                        footerSelector: null,
                        footerContent: null,
                        modalSelector: $("#regModal"),
                        modalState: "show"
                    });
                    setTimeout(function(){
                        gotoLocation("../admin/create-story.php");
                    }, 4000);

                    $("#createStoryButton").show('slow');
                    $("#loaderButton").hide('slow');
                }else{
                    setModal({
                        headerSelector: $("#modalHeader"), 
                        headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                        bodySelector: $("#modalBody"),
                        bodyContent:  "Campaign creation failed for some unknown reasons, make sure you have no duplicate campaign and try again!",
                        footerSelector: null,
                        footerContent: null,
                        modalSelector: $("#regModal"),
                        modalState: "show"
                    }); 

                    $("#createStoryButton").show('slow');
                    $("#loaderButton").hide('slow');
                }
            });
        }
    });

    $('#createNewsButton').click(function(e){
        let topic = $("#topic").val();
        let link = $("#link").val();
        let smallImage = ($('#smallImage').prop('files')[0]).name;
        let createNews = "cn";

        // console.log(topic+' - '+link+' - '+smallImage);
        
        if(topic === ""){
            setModal({
                headerSelector: $("#modalHeader"), 
                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                bodySelector: $("#modalBody"),
                bodyContent:  "Topic field is required",
                footerSelector: null,
                footerContent: null,
                modalSelector: $("#regModal"),
                modalState: "show"
            });
        }else if(link === ""){
            setModal({
                headerSelector: $("#modalHeader"), 
                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                bodySelector: $("#modalBody"),
                bodyContent:  "Link field is required",
                footerSelector: null,
                footerContent: null,
                modalSelector: $("#regModal"),
                modalState: "show"
            });
        }else if(smallImage === ""){
            setModal({
                headerSelector: $("#modalHeader"), 
                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                bodySelector: $("#modalBody"),
                bodyContent:  "Small image is required",
                footerSelector: null,
                footerContent: null,
                modalSelector: $("#regModal"),
                modalState: "show"
            });
        }else{
            $("#createNewsButton").hide('slow');
            $("#loaderButton").show('slow');

            e.preventDefault();
            $.post("../classes/controller.php", { createNews, topic, link, smallImage }, function(data){
                //alert(data);
                if(data === "Successfully Created"){
                   setModal({
                        headerSelector: $("#modalHeader"), 
                        headerContent: "<i class='fas fa-check-circle text-success'></i> Success",
                        bodySelector: $("#modalBody"),
                        bodyContent:  "News Created Successfully!",
                        footerSelector: null,
                        footerContent: null,
                        modalSelector: $("#regModal"),
                        modalState: "show"
                    });
                    setTimeout(function(){
                        gotoLocation("../admin/create-news.php");
                    }, 4000);

                    $("#createNewsButton").show('slow');
                    $("#loaderButton").hide('slow');
                }else{
                    setModal({
                        headerSelector: $("#modalHeader"), 
                        headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                        bodySelector: $("#modalBody"),
                        bodyContent:  "News creation failed for some unknown reasons, make sure you have no duplicate news and try again!",
                        footerSelector: null,
                        footerContent: null,
                        modalSelector: $("#regModal"),
                        modalState: "show"
                    }); 

                    $("#createNewsButton").show('slow');
                    $("#loaderButton").hide('slow');
                }
            });
        }
    });

    $('#createVideoButton').click(function(e){
        let topic = $("#topic").val();
        let link = $("#link").val();
        let createVideo = "cv";

        // console.log(topic+' - '+link);
        
        if(topic === ""){
            setModal({
                headerSelector: $("#modalHeader"), 
                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                bodySelector: $("#modalBody"),
                bodyContent:  "Topic field is required",
                footerSelector: null,
                footerContent: null,
                modalSelector: $("#regModal"),
                modalState: "show"
            });
        }else if(link === ""){
            setModal({
                headerSelector: $("#modalHeader"), 
                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                bodySelector: $("#modalBody"),
                bodyContent:  "Link field is required",
                footerSelector: null,
                footerContent: null,
                modalSelector: $("#regModal"),
                modalState: "show"
            });
        }else{
            $("#createVideoButton").hide('slow');
            $("#loaderButton").show('slow');

            e.preventDefault();
            $.post("../classes/controller.php", { createVideo, topic, link }, function(data){
                //alert(data);
                if(data === "Successfully Created"){
                   setModal({
                        headerSelector: $("#modalHeader"), 
                        headerContent: "<i class='fas fa-check-circle text-success'></i> Success",
                        bodySelector: $("#modalBody"),
                        bodyContent:  "Video Created Successfully!",
                        footerSelector: null,
                        footerContent: null,
                        modalSelector: $("#regModal"),
                        modalState: "show"
                    });
                    setTimeout(function(){
                        gotoLocation("../admin/create-video.php");
                    }, 4000);

                    $("#createVideoButton").show('slow');
                    $("#loaderButton").hide('slow');
                }else{
                    setModal({
                        headerSelector: $("#modalHeader"), 
                        headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                        bodySelector: $("#modalBody"),
                        bodyContent:  "Video creation failed for some unknown reasons, make sure you have no duplicate news and try again!",
                        footerSelector: null,
                        footerContent: null,
                        modalSelector: $("#regModal"),
                        modalState: "show"
                    }); 

                    $("#createVideoButton").show('slow');
                    $("#loaderButton").hide('slow');
                }
            });
        }
    });

    function fetchCamps(){
        let fetchCamps = "fc";
        $.post("../classes/controller.php", { fetchCamps }, function(data){
            //alert(data);
            let campArray = JSON.parse(data);
            //alert(campArray);
            campArray.map(function(camp){
                $(".campList").append('<p class="p-3 border text-primary camps" style="margin: 0; cursor: pointer" campId="'+camp.id+'">'+camp.name+'</p>');
            });

            var options = {
                dataSource: campArray,
                callback: function (response, pagination) {
                    //window.console && console.log(response, pagination);
            
                    var dataHtml = '';

                    $.each(response, function (index, item) {
                        dataHtml +='<tr>'+
                        '<td>'+item.name+'</td>'+
                        '<td><img src="../assets/images/'+item.img_sm+'" style="max-width: 50px; max-height: auto; border-radius: 10px;"></td>'+
                        '<td><img src="../assets/images/'+item.img_bg+'" style="max-width: 50px; max-height: auto; border-radius: 10px;"></td>'+
                        '<td>'+item.subject+'</td>'+
                        '<td>'+item.detail+'</td>'+
                        '<td>'+item.required+'</td>'+
                        '<td>'+item.raised+'</td>'+
                        '<td>'+item.v_link+'</td>'+
                        '<td>'+item.date_created+'</td>'+
                        '<td>'+(item.status ? '<span class="text-success">Active</span>' : '<span class="text-muted">Disabled</span>')+'</td>'+
                        '<td>'+
                        '<button class="btn btn-sm btn-warning campEdit" data-toggle="modal" data-target="#editCampModal" campId="'+item.id+'" campName="'+item.name+'" smallImg="'+item.img_sm+'" bigImg="'+item.img_bg+'" subject="'+item.subject+'" detail="'+item.detail+'" reqAmount="'+item.required+'" vLink="'+item.v_link+'">Edit</button>'+
                        '</td>'+
                      '</tr>';

                        $(".campList").append('<p class="p-3 border text-primary camps" style="margin: 0; cursor: pointer" campId="'+item.id+'">'+item.name+'</p>');
                    });

                    $("#listOfCamps").prev().html(dataHtml);
                }
            };

            // $("#pagination-demo1").pagination(options);

        });
    }
    fetchCamps();

    $(document).on("click", ".campEdit", function() {
        let campId = $(this).attr("campId");
        let campName = $(this).attr("campName");
        let smallImg = $(this).attr("smallImg");
        let bigImg = $(this).attr("bigImg");
        let subject = $(this).attr("subject");
        let detail = $(this).attr("detail");
        let vLink = $(this).attr("vLink");
        //console.log("Check Detail", detail);
        let reqAmount = $(this).attr("reqAmount");
        $('#patientName').val(campName);
        $('#subject').val(subject);
        $('#amountRequired').val(reqAmount);
        $('#vLink').val(vLink);
        $('#previewSm').html("<img src='../assets/images/"+smallImg+"'>");
        // ($('#smallImage').prop('files')[0]).name = smallImg;
        $('#previewLg').html("<img src='../assets/images/"+bigImg+"' style='width: 261px; height: 167px;'>");
        // ($('#largeImage').prop('files')[0]).name = bigImg;
        $('#previewStory').html("<img src='../assets/images/txt-file.png'>");
        $('#uploadStatusStory').html(detail);
        // ($('#storyFile').prop('files')[0]).name = detail;
        $('#idHolder').text(campId);
    });

    $('#editCampButton').click(function(e){
        let patientName = $("#patientName").val();
        let subject = $("#subject").val();
        let vLink = $("#vLink").val();
        let amountRequired = $("#amountRequired").val();
        let smallImage = ($('#smallImage').prop('files')).length > 0 ? ($('#smallImage').prop('files')[0]).name : "";
        let largeImage = ($('#largeImage').prop('files')).length > 0 ? ($('#largeImage').prop('files')[0]).name : "";
        let storyFile =  ($('#storyFile').prop('files')).length > 0 ? ($('#storyFile').prop('files')[0]).name : "";
        let campId = $('#idHolder').text();
        let editCamp = "ec";

        // console.log(patientName+' - '+subject+' - '+amountRequired+' - '+smallImage+' - '+largeImage+' - '+storyFile+' - '+campId+' - '+vLink);
        
        if(patientName === ""){
            setModal({
                headerSelector: $("#modalHeader"), 
                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                bodySelector: $("#modalBody"),
                bodyContent:  "Patient name field is required",
                footerSelector: null,
                footerContent: null,
                modalSelector: $("#regModal"),
                modalState: "show"
            });
        }else if(subject === ""){
            setModal({
                headerSelector: $("#modalHeader"), 
                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                bodySelector: $("#modalBody"),
                bodyContent:  "Subject field is required",
                footerSelector: null,
                footerContent: null,
                modalSelector: $("#regModal"),
                modalState: "show"
            });
        }else if(amountRequired === ""){
            setModal({
                headerSelector: $("#modalHeader"), 
                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                bodySelector: $("#modalBody"),
                bodyContent:  "Required amount field is required",
                footerSelector: null,
                footerContent: null,
                modalSelector: $("#regModal"),
                modalState: "show"
            });
        }else{
            $("#editCampButton").hide('slow');
            $("#loaderButton").show('slow');

            e.preventDefault();
            $.post("../classes/controller.php", { editCamp, campId, patientName, subject, vLink, amountRequired, smallImage, largeImage, storyFile }, function(data){
                //alert(data);
                if(data === "Successfully Created"){
                   setModal({
                        headerSelector: $("#modalHeader"), 
                        headerContent: "<i class='fas fa-check-circle text-success'></i> Success",
                        bodySelector: $("#modalBody"),
                        bodyContent:  "Campaign Edited Successfully!",
                        footerSelector: null,
                        footerContent: null,
                        modalSelector: $("#regModal"),
                        modalState: "show"
                    });
                    setTimeout(function(){
                        gotoLocation("../admin/camp-list.php");
                    }, 4000);

                    $("#editCampButton").show('slow');
                    $("#loaderButton").hide('slow');
                }else{
                    setModal({
                        headerSelector: $("#modalHeader"), 
                        headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                        bodySelector: $("#modalBody"),
                        bodyContent:  "Campaign editing failed for some unknown reasons, make sure you have no duplicate campaign and try again!",
                        footerSelector: null,
                        footerContent: null,
                        modalSelector: $("#regModal"),
                        modalState: "show"
                    }); 

                    $("#editCampButton").show('slow');
                    $("#loaderButton").hide('slow');
                }
            });
        }
    });

    function fetchEduCamps(){
        let fetchEduCamps = "fec";
        $.post("../classes/controller.php", { fetchEduCamps }, function(data){
            //alert(data);
            let campArray = JSON.parse(data);
            //alert(campArray);
            campArray.map(function(camp){
                $(".campList").append('<p class="p-3 border text-primary camps" style="margin: 0; cursor: pointer" campId="'+camp.id+'">'+camp.name+'</p>');
            });

            var options = {
                dataSource: campArray,
                callback: function (response, pagination) {
                    //window.console && console.log(response, pagination);
            
                    var dataHtml = '';

                    $.each(response, function (index, item) {
                        dataHtml +='<tr>'+
                        '<td><img src="../assets/images/'+item.img_sm+'" style="max-width: 50px; max-height: auto; border-radius: 10px;"></td>'+
                        '<td><img src="../assets/images/'+item.img_bg+'" style="max-width: 50px; max-height: auto; border-radius: 10px;"></td>'+
                        '<td>'+item.subject+'</td>'+
                        '<td>'+item.detail+'</td>'+
                        '<td>'+item.required+'</td>'+
                        '<td>'+item.raised+'</td>'+
                        '<td>'+item.date_created+'</td>'+
                        '<td>'+(item.status ? '<span class="text-success">Active</span>' : '<span class="text-muted">Disabled</span>')+'</td>'+
                        '<td>'+
                        '<button class="btn btn-sm btn-warning eduEdit" data-toggle="modal" data-target="#editEduModal" campId="'+item.id+'" smallImg="'+item.img_sm+'" bigImg="'+item.img_bg+'" subject="'+item.subject+'" detail="'+item.detail+'" reqAmount="'+item.required+'">Edit</button>'+
                        '</td>'+
                      '</tr>';

                        $(".campList").append('<p class="p-3 border text-primary camps" style="margin: 0; cursor: pointer" campId="'+item.id+'">'+item.name+'</p>');
                    });

                    $("#listOfEduCamps").prev().html(dataHtml);
                }
            };

            // $("#pagination-demo1").pagination(options);

        });
    }
    fetchEduCamps();

    $(document).on("click", ".eduEdit", function() {
        let campId = $(this).attr("campId");
        let smallImg = $(this).attr("smallImg");
        let bigImg = $(this).attr("bigImg");
        let subject = $(this).attr("subject");
        let detail = $(this).attr("detail");
        let reqAmount = $(this).attr("reqAmount");
        $('#subject').val(subject);
        $('#amountRequired').val(reqAmount);
        $('#previewSm').html("<img src='../assets/images/"+smallImg+"'>");
        // ($('#smallImage').prop('files')[0]).name = smallImg;
        $('#previewLg').html("<img src='../assets/images/"+bigImg+"' style='width: 261px; height: 167px;'>");
        // ($('#largeImage').prop('files')[0]).name = bigImg;
        $('#previewStory').html("<img src='../assets/images/txt-file.png'>");
        $('#uploadStatusStory').html(detail);
        // ($('#storyFile').prop('files')[0]).name = detail;
        $('#idHolder').text(campId);
    });

    $('#editEduButton').click(function(e){
        let subject = $("#subject").val();
        let amountRequired = $("#amountRequired").val();
        let smallImage = ($('#smallImage').prop('files')).length > 0 ? ($('#smallImage').prop('files')[0]).name : "";
        let largeImage = ($('#largeImage').prop('files')).length > 0 ? ($('#largeImage').prop('files')[0]).name : "";
        let storyFile =  ($('#storyFile').prop('files')).length > 0 ? ($('#storyFile').prop('files')[0]).name : "";
        let campId = $('#idHolder').text();
        let editEdu = "ee";

        // console.log(subject+' - '+amountRequired+' - '+smallImage+' - '+largeImage+' - '+storyFile+' - '+campId);
        
        if(subject === ""){
            setModal({
                headerSelector: $("#modalHeader"), 
                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                bodySelector: $("#modalBody"),
                bodyContent:  "Subject field is required",
                footerSelector: null,
                footerContent: null,
                modalSelector: $("#regModal"),
                modalState: "show"
            });
        }else if(amountRequired === ""){
            setModal({
                headerSelector: $("#modalHeader"), 
                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                bodySelector: $("#modalBody"),
                bodyContent:  "Required amount field is required",
                footerSelector: null,
                footerContent: null,
                modalSelector: $("#regModal"),
                modalState: "show"
            });
        }else{
            $("#editEduButton").hide('slow');
            $("#loaderButton").show('slow');

            e.preventDefault();
            $.post("../classes/controller.php", { editEdu, campId, subject, amountRequired, smallImage, largeImage, storyFile }, function(data){
                //alert(data);
                if(data === "Successfully Created"){
                   setModal({
                        headerSelector: $("#modalHeader"), 
                        headerContent: "<i class='fas fa-check-circle text-success'></i> Success",
                        bodySelector: $("#modalBody"),
                        bodyContent:  "Campaign Edited Successfully!",
                        footerSelector: null,
                        footerContent: null,
                        modalSelector: $("#regModal"),
                        modalState: "show"
                    });
                    setTimeout(function(){
                        gotoLocation("../admin/edu-camp-list.php");
                    }, 4000);

                    $("#editEduButton").show('slow');
                    $("#loaderButton").hide('slow');
                }else{
                    setModal({
                        headerSelector: $("#modalHeader"), 
                        headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                        bodySelector: $("#modalBody"),
                        bodyContent:  "Campaign editing failed for some unknown reasons, make sure you have no duplicate campaign and try again!",
                        footerSelector: null,
                        footerContent: null,
                        modalSelector: $("#regModal"),
                        modalState: "show"
                    }); 

                    $("#editEduButton").show('slow');
                    $("#loaderButton").hide('slow');
                }
            });
        }
    });

    function fetchAllStories(){
        let fetchAllStories = "fas";
        $.post("../classes/controller.php", { fetchAllStories }, function(data){
            //alert(data);
            let storyArray = JSON.parse(data);
            //alert(campArray);
            storyArray.map(function(camp){
                $(".campList").append('<p class="p-3 border text-primary camps" style="margin: 0; cursor: pointer" campId="'+camp.id+'">'+camp.name+'</p>');
            });

            var options = {
                dataSource: storyArray,
                callback: function (response, pagination) {
                    //window.console && console.log(response, pagination);
            
                    var dataHtml = '';

                    $.each(response, function (index, item) {
                        dataHtml +='<tr>'+
                        '<td>'+item.name+'</td>'+
                        '<td><img src="../assets/images/'+item.img_sm+'" style="max-width: 50px; max-height: auto; border-radius: 10px;"></td>'+
                        '<td><img src="../assets/images/'+item.img_bg+'" style="max-width: 50px; max-height: auto; border-radius: 10px;"></td>'+
                        '<td>'+item.subject+'</td>'+
                        '<td>'+item.detail+'</td>'+
                        '<td>'+item.required+'</td>'+
                        '<td>'+item.raised+'</td>'+
                        '<td>'+item.date_created+'</td>'+
                        '<td>'+item.v_link+'</td>'+
                        '<td>'+
                        '<button class="btn btn-sm btn-warning storyEdit" data-toggle="modal" data-target="#editStoryModal" campId="'+item.id+'" campName="'+item.name+'" smallImg="'+item.img_sm+'" bigImg="'+item.img_bg+'" subject="'+item.subject+'" vLink="'+item.v_link+'" detail="'+item.detail+'" reqAmount="'+item.required+'">Edit</button>'+
                        '</td>'+
                      '</tr>';

                        $(".campList").append('<p class="p-3 border text-primary camps" style="margin: 0; cursor: pointer" campId="'+item.id+'">'+item.name+'</p>');
                    });

                    $("#listOfStories").prev().html(dataHtml);
                }
            };

            // $("#pagination-demo1").pagination(options);

        });
    }
    fetchAllStories();

    $(document).on("click", ".storyEdit", function() {
        let campId = $(this).attr("campId");
        let campName = $(this).attr("campName");
        let smallImg = $(this).attr("smallImg");
        let bigImg = $(this).attr("bigImg");
        let subject = $(this).attr("subject");
        let detail = $(this).attr("detail");
        let vLink = $(this).attr("vLink");
        //console.log("Check Detail", detail);
        let reqAmount = $(this).attr("reqAmount");
        $('#patientName').val(campName);
        $('#subject').val(subject);
        $('#amountRequired').val(reqAmount);
        $('#vLink').val(vLink);
        $('#previewSm').html("<img src='../assets/images/"+smallImg+"'>");
        // ($('#smallImage').prop('files')[0]).name = smallImg;
        $('#previewLg').html("<img src='../assets/images/"+bigImg+"' style='width: 261px; height: 167px;'>");
        // ($('#largeImage').prop('files')[0]).name = bigImg;
        $('#ps').html("<img src='../assets/images/txt-file.png'>");
        $('#uss').html(detail);
        // ($('#storyFile').prop('files')[0]).name = detail;
        $('#idHolder').text(campId);
    });

    $('#editStoryButton').click(function(e){
        let patientName = $("#patientName").val();
        let subject = $("#subject").val();
        let vLink = $("#vLink").val();
        let amountRequired = $("#amountRequired").val();
        let smallImage = ($('#smallImage').prop('files')).length > 0 ? ($('#smallImage').prop('files')[0]).name : "";
        let largeImage = ($('#largeImage').prop('files')).length > 0 ? ($('#largeImage').prop('files')[0]).name : "";
        let storyFile =  ($('#sf').prop('files')).length > 0 ? ($('#sf').prop('files')[0]).name : "";
        let campId = $('#idHolder').text();
        let editStory = "es";

        // console.log(patientName+' - '+subject+' - '+amountRequired+' - '+smallImage+' - '+largeImage+' - '+storyFile+' - '+campId+' - '+vLink);
        
        if(patientName === ""){
            setModal({
                headerSelector: $("#modalHeader"), 
                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                bodySelector: $("#modalBody"),
                bodyContent:  "Patient name field is required",
                footerSelector: null,
                footerContent: null,
                modalSelector: $("#regModal"),
                modalState: "show"
            });
        }else if(subject === ""){
            setModal({
                headerSelector: $("#modalHeader"), 
                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                bodySelector: $("#modalBody"),
                bodyContent:  "Subject field is required",
                footerSelector: null,
                footerContent: null,
                modalSelector: $("#regModal"),
                modalState: "show"
            });
        }else if(amountRequired === ""){
            setModal({
                headerSelector: $("#modalHeader"), 
                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                bodySelector: $("#modalBody"),
                bodyContent:  "Required amount field is required",
                footerSelector: null,
                footerContent: null,
                modalSelector: $("#regModal"),
                modalState: "show"
            });
        }else{
            $("#editStoryButton").hide('slow');
            $("#loaderButton").show('slow');

            e.preventDefault();
            $.post("../classes/controller.php", { editStory, campId, patientName, subject, vLink, amountRequired, smallImage, largeImage, storyFile }, function(data){
                //alert(data);
                if(data === "Successfully Created"){
                   setModal({
                        headerSelector: $("#modalHeader"), 
                        headerContent: "<i class='fas fa-check-circle text-success'></i> Success",
                        bodySelector: $("#modalBody"),
                        bodyContent:  "Story Edited Successfully!",
                        footerSelector: null,
                        footerContent: null,
                        modalSelector: $("#regModal"),
                        modalState: "show"
                    });
                    setTimeout(function(){
                        gotoLocation("../admin/story-list.php");
                    }, 4000);

                    $("#editCampButton").show('slow');
                    $("#loaderButton").hide('slow');
                }else{
                    setModal({
                        headerSelector: $("#modalHeader"), 
                        headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                        bodySelector: $("#modalBody"),
                        bodyContent:  "Story editing failed for some unknown reasons, make sure you have no duplicate campaign and try again!",
                        footerSelector: null,
                        footerContent: null,
                        modalSelector: $("#regModal"),
                        modalState: "show"
                    }); 

                    $("#editCampButton").show('slow');
                    $("#loaderButton").hide('slow');
                }
            });
        }
    });

    function fetchAllNews(){
        let fetchAllNews = "fan";
        $.post("../classes/controller.php", { fetchAllNews }, function(data){
            //alert(data);
            let newsArray = JSON.parse(data);
            //alert(campArray);
            newsArray.map(function(camp){
                $(".campList").append('<p class="p-3 border text-primary camps" style="margin: 0; cursor: pointer" campId="'+camp.id+'">'+camp.name+'</p>');
            });

            var options = {
                dataSource: newsArray,
                callback: function (response, pagination) {
                    //window.console && console.log(response, pagination);
            
                    var dataHtml = '';

                    $.each(response, function (index, item) {
                        dataHtml +='<tr>'+
                        '<td>'+item.topic+'</td>'+
                        '<td><img src="../assets/images/'+item.image+'" style="max-width: 50px; max-height: auto; border-radius: 10px;"></td>'+
                        '<td><a href="'+item.link+'">'+item.link+'</a></td>'+
                        '<td>'+item.date+'</td>'+
                        '<td>'+(item.status ? '<span class="text-success">Published</span>' : '<span class="text-muted">Disabled</span>')+'</td>'+
                        '<td>'+
                        '<button class="btn btn-sm btn-warning newsEdit" data-toggle="modal" data-target="#editNewsModal" newsId="'+item.id+'" smallImg="'+item.image+'" link="'+item.link+'" topic="'+item.topic+'">Edit</button>'+
                        '</td>'+
                      '</tr>';

                        $(".campList").append('<p class="p-3 border text-primary camps" style="margin: 0; cursor: pointer" campId="'+item.id+'">'+item.name+'</p>');
                    });

                    $("#listOfNews").prev().html(dataHtml);
                }
            };

            // $("#pagination-demo1").pagination(options);

        });
    }
    fetchAllNews();

    $(document).on("click", ".newsEdit", function() {
        let newsId = $(this).attr("newsId");
        let smallImg = $(this).attr("smallImg");
        let topic = $(this).attr("topic");
        let link = $(this).attr("link");
        $('#topic').val(topic);
        $('#link').val(link);
        $('#previewSm').html("<img src='../assets/images/"+smallImg+"'>");
        $('#idHolder').text(newsId);
    });

    $('#editNewsButton').click(function(e){
        let topic = $("#topic").val();
        let link = $("#link").val();
        let smallImage = ($('#smallImage').prop('files')).length > 0 ? ($('#smallImage').prop('files')[0]).name : "";
        let newsId = $('#idHolder').text();
        let editNews = "en";

        // console.log(topic+' - '+link+' - '+smallImage+' - '+newsId);
        
        if(topic === ""){
            setModal({
                headerSelector: $("#modalHeader"), 
                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                bodySelector: $("#modalBody"),
                bodyContent:  "Topic field is required",
                footerSelector: null,
                footerContent: null,
                modalSelector: $("#regModal"),
                modalState: "show"
            });
        }else if(link === ""){
            setModal({
                headerSelector: $("#modalHeader"), 
                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                bodySelector: $("#modalBody"),
                bodyContent:  "Link field is required",
                footerSelector: null,
                footerContent: null,
                modalSelector: $("#regModal"),
                modalState: "show"
            });
        }else{
            $("#editNewsButton").hide('slow');
            $("#loaderButton").show('slow');

            e.preventDefault();
            $.post("../classes/controller.php", { editNews, newsId, topic, link, smallImage }, function(data){
                //alert(data);
                if(data === "Successfully Created"){
                   setModal({
                        headerSelector: $("#modalHeader"), 
                        headerContent: "<i class='fas fa-check-circle text-success'></i> Success",
                        bodySelector: $("#modalBody"),
                        bodyContent:  "News Edited Successfully!",
                        footerSelector: null,
                        footerContent: null,
                        modalSelector: $("#regModal"),
                        modalState: "show"
                    });
                    setTimeout(function(){
                        gotoLocation("../admin/news-list.php");
                    }, 4000);

                    $("#editNewsButton").show('slow');
                    $("#loaderButton").hide('slow');
                }else{
                    setModal({
                        headerSelector: $("#modalHeader"), 
                        headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                        bodySelector: $("#modalBody"),
                        bodyContent: "News editing failed for some unknown reasons, make sure you have no duplicate campaign and try again!",
                        footerSelector: null,
                        footerContent: null,
                        modalSelector: $("#regModal"),
                        modalState: "show"
                    }); 

                    $("#editNewsButton").show('slow');
                    $("#loaderButton").hide('slow');
                }
            });
        }
    });

    function fetchAllVideos(){
        let fetchAllVideos = "fav";
        $.post("../classes/controller.php", { fetchAllVideos }, function(data){
            //alert(data);
            let videoArray = JSON.parse(data);
            //alert(campArray);
            videoArray.map(function(camp){
                $(".campList").append('<p class="p-3 border text-primary camps" style="margin: 0; cursor: pointer" campId="'+camp.id+'">'+camp.name+'</p>');
            });

            var options = {
                dataSource: videoArray,
                callback: function (response, pagination) {
                    //window.console && console.log(response, pagination);
            
                    var dataHtml = '';

                    $.each(response, function (index, item) {
                        dataHtml +='<tr>'+
                        '<td>'+item.topic+'</td>'+
                        '<td>'+item.v_link+'</td>'+
                        '<td>'+item.date+'</td>'+
                        '<td>'+(item.status ? '<span class="text-success">Published</span>' : '<span class="text-muted">Disabled</span>')+'</td>'+
                        '<td>'+
                        '<button class="btn btn-sm btn-warning videoEdit" data-toggle="modal" data-target="#editVideoModal" videoId="'+item.id+'" link="'+item.v_link+'" topic="'+item.topic+'">Edit</button>'+
                        '</td>'+
                      '</tr>';

                        $(".campList").append('<p class="p-3 border text-primary camps" style="margin: 0; cursor: pointer" campId="'+item.id+'">'+item.name+'</p>');
                    });

                    $("#listOfVideos").prev().html(dataHtml);
                }
            };

            // $("#pagination-demo1").pagination(options);

        });
    }
    fetchAllVideos();

    $(document).on("click", ".videoEdit", function() {
        let videoId = $(this).attr("videoId");
        let topic = $(this).attr("topic");
        let link = $(this).attr("link");
        $('#topic').val(topic);
        $('#link').val(link);
        $('#idHolder').text(videoId);
    });

    $('#editVideoButton').click(function(e){
        let topic = $("#topic").val();
        let link = $("#link").val();
        let videoId = $('#idHolder').text();
        let editVideo = "ev";

        // console.log(topic+' - '+link+' - '+videoId);
        
        if(topic === ""){
            setModal({
                headerSelector: $("#modalHeader"), 
                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                bodySelector: $("#modalBody"),
                bodyContent:  "Topic field is required",
                footerSelector: null,
                footerContent: null,
                modalSelector: $("#regModal"),
                modalState: "show"
            });
        }else if(link === ""){
            setModal({
                headerSelector: $("#modalHeader"), 
                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                bodySelector: $("#modalBody"),
                bodyContent:  "Link field is required",
                footerSelector: null,
                footerContent: null,
                modalSelector: $("#regModal"),
                modalState: "show"
            });
        }else{
            $("#editVideoButton").hide('slow');
            $("#loaderButton").show('slow');

            e.preventDefault();
            $.post("../classes/controller.php", { editVideo, videoId, topic, link }, function(data){
                //alert(data);
                if(data === "Successfully Created"){
                   setModal({
                        headerSelector: $("#modalHeader"), 
                        headerContent: "<i class='fas fa-check-circle text-success'></i> Success",
                        bodySelector: $("#modalBody"),
                        bodyContent:  "Video Edited Successfully!",
                        footerSelector: null,
                        footerContent: null,
                        modalSelector: $("#regModal"),
                        modalState: "show"
                    });
                    setTimeout(function(){
                        gotoLocation("../admin/video-list.php");
                    }, 4000);

                    $("#editVideoButton").show('slow');
                    $("#loaderButton").hide('slow');
                }else{
                    setModal({
                        headerSelector: $("#modalHeader"), 
                        headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                        bodySelector: $("#modalBody"),
                        bodyContent: "Video editing failed for some unknown reasons, make sure you have no duplicate campaign and try again!",
                        footerSelector: null,
                        footerContent: null,
                        modalSelector: $("#regModal"),
                        modalState: "show"
                    }); 

                    $("#editVideoButton").show('slow');
                    $("#loaderButton").hide('slow');
                }
            });
        }
    });
});