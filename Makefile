BUILD_DIR := ./build

.PHONY: default
default: build

.PHONY: help
help:
	@echo
	@echo "The make targets are:"
	@echo
	@echo "- help                 Display this help message"
	@echo "- build                Build application"
	@echo "- clean                Remove all the build artefacts"
	@echo "- rebuild              Do clean and build tasks"
	@echo
	@echo "The default target is build."
	@echo

.PHONY: build
build:
	mkdir -p $(BUILD_DIR)
	cp platform/index.html $(BUILD_DIR)/index.html
	cp platform/style.css $(BUILD_DIR)/style.css
	cp -r platform/js $(BUILD_DIR)/js
	cp -r platform/lib $(BUILD_DIR)/lib
	cp -r platform/img $(BUILD_DIR)/img

.PHONY: clean
clean:
	rm -f $(BUILD_DIR)/index.html
	rm -f $(BUILD_DIR)/style.css
	rm -rf $(BUILD_DIR)/js
	rm -rf $(BUILD_DIR)/lib
	rm -rf $(BUILD_DIR)/img

.PHONY: rebuild
rebuild: clean build

