NavigationView = soma.View.extend({
	id: null,
	currentSection: null,
	setup: function(id) {
		this.id = id;
		this.createLinks();
		this.select(NavigationConstants.ABOUT);
	},
	createLinks: function() {
		$(this.id + " li").click(this.clickHandler);
		$(this.id + " li a").removeAttr("href").css("cursor","pointer");;
	},
	clickHandler: function() {
		var navigationId = $(this).attr('id').split("-")[1];
		this.dispatchEvent(new NavigationEvent(NavigationEvent.SELECT, navigationId))
		return false;
	},
	getListElement: function() {
		return $(this.id + ' li[id*="' + this.currentSection + '"]');
	},
	clear: function() {
		$(this.id + " li").css("font-weight", "normal");
	},
	highlight: function() {
		this.clear();
		this.getListElement().css("font-weight", "bold");
	},
	select: function(navigationId) {
		this.currentSection = navigationId;
		this.highlight();
	},
});
NavigationView.NAME = "View::NavigationView";

StepView = soma.View.extend({
	code: null,
	editor: null,
	runButton: null,
	clearButton: null,
	solutionButton: null,
	logElement: null,
	count: 0,
	init: function() {
		this.code = $(this.domElement).find("textarea.code")[0];
		if (this.code) {
			this.createEditor();
			this.createButtons();
			this.createLog();
			log = this.traceCode.bind(this);
		}
	},
	createEditor: function() {
		this.editor = CodeMirror.fromTextArea(this.code, {
			mode: "javascript",
			theme: "eclipse",
			lineNumbers: true
		});
	},
	createButtons: function() {
		$(this.domElement).append('<button class="run">run</button>');
		$(this.domElement).append('<button class="clear">clear</button>');
		$(this.domElement).append('<button class="solution">solution</button>');
		this.runButton = $(this.domElement).find(".run");
		this.clearButton = $(this.domElement).find(".clear");
		this.solutionButton = $(this.domElement).find(".solution");
		$(this.runButton).click(this.runHandler.bind(this));
		$(this.clearButton).click(this.clearHandler.bind(this));
		$(this.solutionButton).click(this.solutionHandler.bind(this));
	},
	createLog: function() {
		$(this.domElement).append('<div class="log"></div>');
		this.logElement = $(this.domElement).find(".log");
	},
	traceCode: function(value) {
		$(this.logElement).append(++this.count + ". " + value + "<br/>");
	},
	runHandler: function() {
		console.log('RUN');
		eval(this.editor.getValue());
	},
	clearHandler: function() {
		console.log('CLEAR');
	},
	solutionHandler: function() {
		console.log('SOLUTION');
	},
	refresh:function() {
		if (this.editor) setTimeout(this.editor.refresh, 20);
//		$('.CodeMirror').each(function(i, el){
//			console.log(CodeMirror(el));
//		    CodeMirror(el).refresh();
//		});
	}
});

