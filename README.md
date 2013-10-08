JBoss BPM Process Designer on OpenShift 
===========================================
Installing the JBoss BPM Web Process Designer standalone on OpenShift was never easier!

This git repository helps you get up and running quickly with the jBPM
Migration Tooling as integrated with the Web Designer.


Running on OpenShift
----------------------

Create an account at http://openshift.redhat.com/

Create a JBoss EAP application

    rhc app create -t jbossas-7 --from-code git://github.com/eschabell/openshift-bpm-process-designer.git designer

Or you can create it in phased steps with the following commands

    rhc app create -t jbossas-7 designer

    cd designer

    git remote add upstream -m master git://github.com/eschabell/openshift-bpm-process-designer.git

    git pull -s recursive -X theirs upstream master

    git push


That's it, you can now checkout your application at:

    http://designer-$your_domain.rhcloud.com     

Just follow the link provided to the designer login:

    http://designer-$your_domain.rhcloud.com/designer

    Login credentials

           user: erics

       password: erics

Releases
---------

- v1.2 running on JBoss AS 7.1, standalone web process designer v6.0.x product branch.

- v1.1 running on JBoss AS 7.1, standalone web process designer v6.

- v1.0 running on JBoss EAP 6.0, standalone web process designer 2.5.

