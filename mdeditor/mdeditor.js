(function (window) {
    var mdeditor = function (options) {
        return new mdeditor.prototype.init(options);
    };
    mdeditor.prototype = {
        init: function (options) {
            var me = this;
            var defaults = {
                id: '',
                placeholder: '',
                name: '',
                aTarget: '_blank'
            };
            if (options && options.id) {

                me.copy(defaults, options);

                var wrap = this.getDom(options.id);

                var html = '<textarea id="mdeditor" class="mdeditor" name="{name}" placeholder="{placeholder}"></textarea><div id="mdeditor-html" class="mdeditor-html"></div>';

                html = me.formatString(html, defaults);
                wrap.innerHTML = html;

                var editor = this.getDom('mdeditor');
                var editor2Html = this.getDom('mdeditor-html');

                editor.addEventListener('input', function () {
                    var txt = this.value;
                    me.markdownToHtml(txt);
                });
                me.editor = editor;
                me.editor2Html = editor2Html;
            }
            me.options = defaults;
            return me;
        },

        regLib: {
            ul: /^[\+\-\*]\s(.+)$/,
            ol: /^\d+\.\s(.+)$/,
            toc: /^\s*\[TOC\]\s*$/,
            title: /^\s{0,3}#{1,6}\s+.+$/,
            a: /\[(.*?)\]\((.*?)\)/g,
			strong: /(\*\*([^\s]+)\*\*)|(\_\_([^\s]+)\_\_)/,
            inline_code: /\`(.+?)\`/g,
         	em:/(\*([^\s]+)\*)|(\_([^\s]+)\_)/,
			hr:/^(\*{3,})|(\-{3,})$/,
			//trans:/\\[\-\*\#\+\!\(\)\[\]\{\}\_\.\`]
			//__escape__ : /^\\[\\`\*_{}\[\]()#\+.!\-]/,// /^\\[\\`\*_{}\[\]()#\+.!\-|:]/
        },

        formatString: function (format, data) {
            return format.replace(/{\w+}/g, function ($1) {
                var key = $1.substr(1, $1.length - 2);
                return data[key];
            });
        },

        copy: function (source, dest) {
            for (var name in dest) {
                source[name] = dest[name];
            }
            return source;
        },

        getDom: function (_id) {
            return document.getElementById(_id);
        },

        getMarkdown: function () {
            if (this.editor) {
                return this.editor.value;
            } else {
                return null;
            }
        },

        setMarkdown: function (markdown) {
            if (this.editor) {
                this.editor.value = markdown;
            }
            return this.markdownToHtml(markdown);
        },

        getHTML: function () {
            if (this.editor2Html) {
                return this.editor2Html.innerHTML;
            } else {
                return '';
            }
        },

        markdownToHtml: function (md) {
            var me = this;
            var rows = md.match(/.+/mg) || [];
            var html = [];
            var flag = '';
            var codeType = '';
            var rowsCount = rows.length;
            var rowsStart = 0;
            var toc = null;
            var tdAlign = [];
			//var char = new Array("\\","\`","\*","\_","{","}","[","]","(",")","#","+","-",".","!");
            if (rowsCount && me.regLib.toc.test(rows[0])) {
                rowsStart = 1;
                toc = ['<div class="mdeditor-toc">'];
            }
            for (var i = rowsStart; i < rowsCount; i++) {
                var row = rows[i];
                row = me.replaceHtmlTag(row);
                console.log(row);
                switch (flag) {
                    case 'ol':
                        if (!me.regLib.ol.test(row)) {
                            i--;
                            flag = '';
                            html.push('</ol>');
                        } else {
                            html.push(me.handleOrderList(row));
                            if (i == rowsCount - 1) {
                                html.push('</ol>');
                            }
                        }
                        break;
                    case 'ul':
                        if (!me.regLib.ul.test(row)) {
                            i--;
                            flag = '';
                            html.push('</ul>');
                        } else {
                            html.push(me.handleUnorderedList(row));
                            if (i == rowsCount - 1) {
                                html.push('</ul>');
                            }
                        }
                        break;
                    default :
                        if (me.regLib.title.test(row)) {
                            html.push(me.handleTitle(row, toc));
                        } else if (me.regLib.ol.test(row)) {
                            i--;
                            flag = 'ol';
                            html.push('<ol  class="mdeditor-ol">');
                        } else if (me.regLib.ul.test(row)) {
                            i--;
                            flag = 'ul';
                            html.push('<ul  class="mdeditor-ul">');
                        }  else if (me.regLib.hr.test(row)) {
                            flag = '';
                            row.replace(/^(\*{3,})|(\-{3,})$/, '');
                            html.push('<hr/>');
						} else {
                            html.push(me.handleParagraph(row));
                        }
                        break;
                }
            }

            html = (toc ? toc.join('') + '</div>' : '') + html.join('');

            console.log(html);
            if (this.editor2Html) {
                this.editor2Html.innerHTML = html;
            }
            return html;
        },

        handleTitle: function (txt, toc) {
            //var me = this;
            return txt.replace(/^(\s{0,3}#{1,6}\s)(.+)/, function (match, $1, $2) {
                var hno = $1.length;
                if (toc) {
                    toc.push('<a class="mdeditor-toc-' + hno + '" href="#' + $2 + '">' + $2 + '</a>');
                }
                return '<h' + hno + ' id="' + $2 + '" >' + $2 + '</h' + hno + '>';
            });
        },

        handleParagraph: function (txt) {
            return '<p>' + this.handleInlineSet(txt) + '</p>';
        },

        handleInlineSet: function (txt) {
            txt = this.handleLink(txt);
			txt = this.handleStrong(txt);
			txt = this.handleEm(txt);
            return txt;
        },

        handleLink: function (txt) {
            var me = this;
            return txt.replace(me.regLib.a, function (txt, $1, $2) {
                return '<a href="' + $2 + '" target="' + me.options.aTarget + '">' + $1 + '</a>';
            });
        },

		handleStrong: function (txt) {
            var me = this;
            return txt.replace(me.regLib.strong, function (txt) {
                return '<strong class="mdeditor-strong">' + txt.replace(/(\*\*)|(\_\_)/, '').replace(/(\*\*)|(\_\_)/, '') + '</strong>';
            });
        },
		
		handleEm: function (txt) {
            var me = this;
            return txt.replace(me.regLib.em, function (txt) {
                return '<em class="mdeditor-strong">' + txt.replace(/(\*)|(\_)/, '').replace(/(\*)|(\_)/, '') + '</em>';
            });
        },

        handleUnorderedList: function (txt) {
            txt = txt.replace(/^([\+\*\-]\s)/, '');
            txt = this.handleInlineSet(txt);
            return '<li>' + txt + '</li>';
        },

        handleOrderList: function (txt) {
            txt = txt.replace(/^\d+\.\s/, '');///^ *(\d+)\./
            txt = this.handleInlineSet(txt);
            return '<li>' + txt + '</li>';
        },
		
		/*html2Escape: function (txt) {
 			return txt.replace(/[<>&"]/g,function(c){
   				return {'\\':'\',  '\`':'`',  "\*":"*",  "\_":"_",  "\{":"{",  "\}":"}",  "\[":"[",  "\]":"]",  "\(":"(",  "\)":")",  "\+":"+","\-":"-","\.":".","\!":'!'','\#':'#'}[c];
 			});
		},
        */

        replaceHtmlTag: function (txt) {
            return txt.replace(/\</g, '&lt;').replace(/\>/, '&gt;');
        }
    };
    mdeditor.prototype.init.prototype = mdeditor.prototype;
    window.mdeditor = mdeditor;
})(window);// JavaScript Document