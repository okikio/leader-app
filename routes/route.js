var page = require("../util/page");

module.exports = {
    // List of routers
    "routers": {
        "pages/questions": page({
            "title": "Questions",
            "hero": {
                "src": "/assets/images/city.jpeg",
                "alt": "An iamge of a bustling city."
            },
            "info": [
                {
                    "title": "What is renewable energy?",
                    "description": "Renewable energy is energy derived from natural processes that are replenished at a rate that is equal to or faster than the rate at which they are consumed. There are various forms of renewable energy, deriving directly or indirectly from the sun, or from heat generated deep within the earth. They include energy generated from solar, wind, geothermal, hydropower and ocean resources, solid biomass, biogas and liquid biofuels. Biomass, however, is a renewable resource only if its rate of consumption does not exceed its rate of regeneration.",
                    "img": {
                        "src": "/assets/images/windmill1.jpeg",
                        "alt": "Pictures of wind mills."
                    },
                    "background": "dark1"
                },
                {
                    "title": "Why use renewable energy?",
                    "description": "Fossil fuels are non-renewable, that is, they draw on finite resources that will eventually dwindle, becoming too expensive or too environmentally damaging to retrieve. In contrast, the many types of renewable energy resources-such as wind and solar energy-are constantly replenished and will never run out.",
                    "img": {
                        "src": "/assets/images/windmill2.jpeg",
                        "alt": "Pictures of a wind mill in a sunset"
                    }
                },
                {
                    "title": "Why don't we use more renewable energy?",
                    "description": "In general, renewable energy is more expensive to produce and to use than fossil fuel energy. Favorable renewable resources are often located in remote areas, and it can be expensive to build power lines from the renewable energy sources to the cities that need the electricity. In addition, renewable sources are not always available:\
	                        ul\
	                          li Clouds reduce electricity from solar power plants.\
	                          li Days with low wind reduce electricity from wind farms.\
	                          li Droughts reduce the water available for hydropower.",
                    "img": {
                        "src": "/assets/images/windmill3.jpeg",
                        "alt": "Pictures of wind mills."
                    },
                    "background": "dark1"
                },
                {
                    "title": "What are the benefits of renewable energy?",
                    "description": "All energy sources have some impact on our environment. Fossil fuels—coal, oil, and natural gas—do substantially more harm than renewable energy sources by most measures, including air and water pollution, damage to public health, wildlife and habitat loss, water use, land use, and global warming emissions. However, renewable energy sources don't.",
                    "img": {
                        "src": "/assets/images/windmill4.jpeg",
                        "alt": "Picture of a wind mill from underneat, looking up at the night sky with visible twinkling stars."
                    },
                    "background": "dark2"
                },
            ],
        }),
        "pages/history": page({ 
            "title": "History", 
            "hero": {
                "src": "/assets/images/city2.jpeg",
                "alt": "An iamge of a bustling city."
            },
        }),
        "pages/actions": page({ 
            "title": "Actions", 
            "hero": {
                "src": "/assets/images/city3.jpg",
                "alt": "An iamge of a bustling city."
            }, 
        }),
        "pages/solutions": page({ 
            "title": "Solutions", 
            "hero": {
                "src": "/assets/images/city4.jpg",
                "alt": "An iamge of a bustling city."
            },  
            
        }),
        "pages/sources": page({ 
            "title": "Sources", 
            "hero": {
                "src": "/assets/images/city5.jpg",
                "alt": "An iamge of a bustling city."
            },  
            
        }),
        "index": page({ 
            "title": "Leukemia", 
            "footbar": false, 
            "hero": {
                "src": "/assets/images/city.jpeg",
                "alt": "A lot of stars."
            },
            "pagelist": [
                {   
                    "title": "Questions",
                    "background": "dark2",
                    "hero": {
                        "src": "/assets/images/city.jpeg",
                        "alt": "An image of a bustling city."
                    }, 
                    "content": "Renewable Energy ..."
                },
                {   
                    "title": "History",
                    "background": "dark1",
                    "hero": {
                        "src": "/assets/images/city2.jpeg",
                        "alt": "An image of a bustling city."
                    }, 
                    "content": "Renewable Energy ..."
                },
                {   
                    "title": "Actions",
                    "hero": {
                        "src": "/assets/images/city3.jpg",
                        "alt": "An image of a bustling city."
                    }, 
                    "content": "Renewable Energy ..."
                },
                {   
                    "title": "Solutions",
                    "background": "dark1",
                    "hero": {
                        "src": "/assets/images/city4.jpg",
                        "alt": "An image of a bustling city."
                    }, 
                    "content": "Renewable Energy ..."
                },
                {   
                    "title": "Sources",
                    "background": "dark2",
                    "hero": {
                        "src": "/assets/images/city5.jpg",
                        "alt": "An iamge of a bustling city."
                    }, 
                    "content": "Renewable Energy ..."
                },
            ]
        })
    },

    // List of routes
    "routes": {
        "/questions": "pages/questions",
        "/history": "pages/history",
        "/actions": "pages/actions",
        "/solutions": "pages/solutions",
        "/sources": "pages/sources",
        '/': "index",
    }
};
