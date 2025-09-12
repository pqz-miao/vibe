FROM node:latest

COPY compile_page.sh /compile_page.sh
RUN chmod +x /compile_page.sh

COPY nextjs-app/ /home/user/