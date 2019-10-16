function ModalSystem(){
    var CLASS = this;
    var open = false;
    var currentModal = false;

    this.setupEventListeners = function(){
        $(".modalBtn").on("click", function(){CLASS.openModal($(this))});
        $(".modalclosebtn").on("click", CLASS.closeOverlay);
    };

    this.openModal = function($btn){
        if(open){return;}

        var modal = $btn.data("modal");

        if(currentModal){
            swapModal(modal);
        }else{
            open = true;
            $("#overlay").velocity("fadeIn", {duration:1000, complete: function(){
                    $(".overlay_panel." + modal).removeClass("off").velocity("transition.bounceDownIn",{duration: 1000, complete:function(){
                            currentModal = modal;
                        }
                    });
                }
            })
        }
    };

    function swapModal(modal){
        $(".overlay_panel." + currentModal).velocity("transition.bounceUpOut",{duration: 1000, complete:function(){
                $(".overlay_panel." + currentModal).addClass("off");
                $(".overlay_panel." + modal).velocity("transition.bounceDownIn",{duration: 1000, complete:function(){
                        $(".overlay_panel." + currentModal).removeClass("off");
                        currentModal = modal;
                    }
                });
            }
        });
    };

    this.closeOverlay = function(){
        $("#overlay").velocity("fadeOut", {duration:1000, complete: function(){
                CLASS.closeAllPanels();
                open = false;
                currentModal = false;
            }
        });
    };

    this.closeAllPanels = function(){
        $(".overlay_panel").clearStyle().addClass("off");
    };
}